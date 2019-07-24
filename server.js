'use strict';
const PORT = 8082;
const HOST = '0.0.0.0';
const express = require('express');

// Instantiate Express
const app = express();

// enable CORS
const cors = require('cors');
app.use(cors());

// for parsing JSON request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Only for preloaded initial tasks
var moment = require('moment');

// Create the Express Router for tasks
const router = express.Router();

// Declare and initialize an array of all tasks.
// Populate with a handful of initial tasks for demo purposes.
// Set some for today's date and tomorrow's date.
var allTasks = [{
			id: "1",
			name: "Call Mom",
			description: "Call her and say Happy Birthday",
			done: false,
			due: moment().format('YYYY-MM-DD')
			},
			{
			id: "2",
			name: "Vacuum living room",
			description: "Because it needs it. Check vacuum bag fullness and order more bags if we need them.",
			done: false,
			due: moment().format('YYYY-MM-DD')
			},
			{
			id: "3",
			name: "Wash car",
			description: "Ignore dents while washing. Check tires, too.",
			done: false,
			due: moment().add(1, 'days').format('YYYY-MM-DD')
			},
			{
			id: "4",
			name: "Apply for grant",
			description: "Figure out how to apply for an NEA grant",
			done: true,
			due: "2019-07-22"
			},
			{
			id: "5",
			name: "Coffee w Jason",
			description: "Schedule this, and read the book he recommended before we meet.",
			done: true,
			due: "2019-07-23"
			},
			{
			id: "6",
			name: "Sign up for fall yoga retreat",
			description: "Register on the Yoga Shanti website",
			done: false,
			due: "2019-07-15"
			},
			{
			id: "7",
			name: "Buy a book",
			description: "Research this year's best summer reads and order from an indie bookstore.",
			done: false,
			due: "2019-07-15"
			}
		];

// returns an ID value incremented one number greater than found in the existing set of task IDs
function getNewTaskId() {
	let allIds = [];
	allTasks.forEach(task => { allIds.push(task["id"]) });
	return Math.max.apply(null, allIds) + 1;
}

const apiInstruct = `Under /api:
  	<ul>
  	<li> /tasks to retrieve all tasks </li>
  	<li> /tasks/add to add a new task </li>
  	<li> /tasks/delete/21 to update task with ID of 21 </li>
  	</ul>`

// a GET to instruct usage
router.get('/',function(req,res){
  res.send(apiInstruct);
});

// a GET for all tasks. Returns all tasks.
router.get('/tasks', function(req, res) { 
	res.json( allTasks );
});

// a POST to add a new task. Returns all tasks.
// "id" and "done" are system-generated:
// "id" value is delegated to getNewTaskId()
// "done" is set to false initially.
router.post('/tasks/add', function(req, res) { 
	var newTaskJson = req.body;
	newTaskJson["id"] = getNewTaskId();
	newTaskJson["done"] = false;

	console.log(`/tasks/add service:\n`
		+ JSON.stringify(newTaskJson));

	allTasks.push(newTaskJson);
	res.json(allTasks);
});

// a DELETE to delete a task of given "id" value. Returns all tasks.
router.delete('/tasks/delete/:id', function(req, res) { 
	let reqId = req.params.id;
	let taskToDelete = allTasks.filter( taskToDelete => {
		return taskToDelete.id == reqId;
	})[0];

	console.log(`/tasks/delete/` + reqId + ` :\n` + JSON.stringify(taskToDelete));

	let index = allTasks.indexOf(taskToDelete);
	allTasks.splice(index, 1);

	res.json(allTasks);
});

// a POST to update a task's data state, given its "id" value.
// Returns all tasks.
router.post('/tasks/update/:id', function(req, res) { 
	let reqId = req.params.id;

	let taskToUpdate = allTasks.filter( taskToUpdate => {
		return taskToUpdate.id == reqId;
	})[0];

    if (!taskToUpdate) {
        res.send('An error occurred: The ID of an existing task is a required paramter.');
    } else {

		let index = allTasks.indexOf(taskToUpdate);

		// Debug — output the task in the request object
		console.log(JSON.stringify("REQ.BODY = " + JSON.stringify(req.body)));

		console.log(`/tasks/update/` + reqId + ` ORIGINAL:\n`
			 + JSON.stringify(allTasks[index]));

		taskToUpdate = [];
		const keys = Object.keys(req.body);
		keys.forEach(key => {
			taskToUpdate[key] = req.body[key];
		});
		allTasks[index] = taskToUpdate;

		console.log(`/tasks/update/` + reqId + ` UPDATED:\n`
			 + JSON.stringify(allTasks[index]));

		res.json(allTasks);
	}
});

// Register our routers
app.use('/api', router);
module.exports = app;

// Start our server
app.listen(PORT, HOST);
console.log(`Task API running on http://${HOST}:${PORT}`);

// To handle a 404 response. Express executed all of its functions
// and routes, and found that none of them responded.
app.use(function (req, res, next) {
  res.status(404).send(`Sorry can't find that! ` + apiInstruct)
})