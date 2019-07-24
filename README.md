# Task API

The business logic (microservices) of a simple task management tool, allowing an end user to create, manage and delete tasks using a web interface.

> Together with its separate Tasker UI project, this is a demo of a Node.js, Vue.js, RESTful API microservices application.

## Build and Run

In the project's root directory, run the API in a Docker Compose container:

``` bash
docker-compose up
```
The API is then available at http://localhost:8082/api/tasks

The above installs dependencies and builds a new Docker image if it does not already exist. Refer to the docker-compose.yml file, and the Deployment Notes section below.

## Usage
You can access http://localhost:8082/api/ to output the usage.

Under `/api`:

- `/tasks` to retrieve all tasks
  - returns JSON of tasks
- `/tasks/add` to add a new task
  - returns JSON of all tasks
- `/tasks/delete/21` to update task with ID of 21
  - returns JSON of all tasks

### Persistence

At this time, in-memory storage only.

### Initial Data Set

For demo purposes the API is pre-populated with a handful of initial tasks. Some will be overdue, and some will be due today and tomorrow.

### Task Data Definition

- `id`: String. System-generated value during the /tasks/add service.
- `name`: String
- `description`: String
- `done`: Boolean. Indicates whether task has been completed. System-generated initially to false in the `/tasks/add` service.
- `due`: String. Consists of date in format YYYY-MM-DD.

## Built With

- [Node.js](https://nodejs.org/en/): JavaScript runtime
- [Express.js](http://expressjs.com/): web framework for Node.js
- [CORS](https://www.npmjs.com/package/cors): (Cross Origin Resource Sharing) for handling cross-domain requests
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware, for parsing JSON request bodies
- [Moment.js](https://momentjs.com/): Parse, validate, manipulate, and display dates and times
- [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [ChaiHTTP](https://www.chaijs.com/plugins/chai-http/): for unit and functional testing

## How to Test

``` bash
# run the test implementation
npm test

```

The above runs a Mocha + Chai test implementation that makes HTTP calls to assert all API routes are in place and functioning.

## Deployment Notes

Both the front- and back-end projects of this demo are designed to run as multi-container Docker applications, within Docker Compose. Each project has a YAML file `docker-compose.yml` to configure the application's services as well as a Docker config file `Dockerfile`. From within the root directory of the project, you enter the single command of `docker-compose up` to create and start the services from the configuration.

In the absence of Docker, it may be run as:
``` bash
# install dependencies
npm install

# run the API
node server.js
```
And then in this configuration the UI is also available at http://localhost:8082/api/tasks
