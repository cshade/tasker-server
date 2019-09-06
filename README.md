# Tasker Server

Tasker is a product management suite under construction for [Cagibi](https://cagibilit.com/). This server component is the microservices JSON-based RESTful API business layer, providing an API for a client UI to create, manage and delete tasks and reminders.

> Together with its separate UI component, this is a demo of a containerized Node.js, Vue.js, MongoDB, RESTful API microservices application.

## Build and Run

In the project's root directory, run the API in a Docker Compose container:

```bash
docker-compose up
```

The server is then available at http://localhost:8082/api/

The above installs dependencies and builds a new Docker image if it does not already exist. Refer to the docker-compose.yml file, and the Deployment Notes section below.

## Usage

Access http://localhost:8082/api/ to output the usage.

Under `/api`:

-   TASKS
-   `/task/all` to retrieve all tasks
    -   returns JSON of tasks
-   `/task/random` to retrieve a random task
    -   returns JSON of one task
-   `/task/add` to add a new task
    -   returns JSON of all tasks
-   `/task/delete/<id>` - for example `/task/delete/21` to update task with ID of 21
    -   returns JSON of all tasks
-   `/task/update/<id>` - for example `/task/update/9` to update task with ID of 9
    -   returns JSON of all tasks
-   REMINDERS
-   `/reminder/all` to retrieve all reminders
    -   returns JSON of reminders
-   `/reminder/random` to retrieve a random reminder
    -   returns JSON of one reminder
-   `/reminder/add` to add a new reminder
    -   returns JSON of all reminders
-   `/reminder/delete/<id>` - e.g. `/reminder/delete/21` to update reminder with ID of 21
    -   returns JSON of all reminders
-   `/reminder/update/<id>` - e.g. `/reminder/update/9` to update reminder with ID of 9
    -   returns JSON of all reminders

### Persistence

Data storage in [MongoDB](https://www.mongodb.com/) using [Mongoose.js](https://mongoosejs.com/) models of Task and Reminder.

### Initial Data Set

On startup the API database is cleared and then pre-populated with a handful of initial data. The seed data is pulled from the config.js SEED*DATA value. Refer to the SEED_DATA*\* values in config.js.

The control for this are the config.js values of START_DB_CLEAN and START_DB_SEED.

### Data Definitions

The unique identifier of each model is its `_id` value which is created and managed by MongoDB.

#### Task

-   `_id`
-   `name`: String
-   `description`: String
-   `done`: Boolean. Indicates whether task has been completed. System-generated initially to false.
-   `due`: Date

#### Reminder

-   `_id`
-   `remind`: String. This is the reminder text.
-   `remindwhen`: Date. Indicates when to be reminded.
-   `remindonce`: Boolean for future use. Default is true.

## Built With

-   [Node.js](https://nodejs.org/en/): JavaScript runtime
-   [Express.js](http://expressjs.com/): web framework for Node.js
-   [MongoDB](https://www.mongodb.com/): a document-based database; MongoDB stores data in JSON-like documents
-   [Mongoose.js](https://mongoosejs.com/): MongoDB object modeling for Node.js
-   [CORS](https://www.npmjs.com/package/cors): (Cross Origin Resource Sharing) for handling cross-domain requests
-   [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware, for parsing JSON request bodies
-   [Moment.js](https://momentjs.com/): Parse, validate, manipulate, and display dates and times
-   [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [ChaiHTTP](https://www.chaijs.com/plugins/chai-http/): for unit and functional testing
-   [ESLint](https://eslint.org/): linting
-   [Prettier](https://prettier.io/): code formatting
-   Docker and Docker Compose containerization (see Deployment Notes below)

## How to Test

```bash
# run the test implementation
npm test

```

The above runs a Mocha + Chai test implementation that makes HTTP calls to assert all API routes are in place and functioning.
There is a linting pretest included in the above (as a pretest entry in package.json).
The tests assume MongoDB is running, and for the HTTP calls also this Tasker Server API.

## Deployment Notes

Both the front- and back-end projects of this demo are designed to run as multi-container Docker applications, within Docker Compose. Each project has a YAML file `docker-compose.yml` to configure the application's services as well as a Docker config file `Dockerfile`. From within the root directory of the project, you enter the single command of `docker-compose up` to create and start the services from the configuration. If you have made changes (such as to the DATABASE_URL value in config.js), you will likely need to rebuild the services: `docker-compose build --no-cache` and then again `docker-compose up`.

In the absence of Docker, the DATABASE_URL value in config.js may be changed (to point to local MongoDB) and it may be run as follows. The path in config.js should either be mongodb://mongo:27017/tasker or mongodb://localhost:27017/tasker

```bash
# install dependencies
npm install

# run the API
npm start
```

And then in this configuration the UI is also available at http://localhost:8082/api/
