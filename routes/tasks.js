var express = require("express");
var taskRouter = express.Router();
var Task = require("../models/task");

// get all tasks from the db
taskRouter.route("/all").get(function(req, res) {
	console.log("taskRouter.route('/all')");
	Task.find((err, tasks) => {
		if (err) {
			res.status(400).send("Unable to retrieve tasks from server");
			return;
		}
		res.json(tasks);
		return;
	});
});

// create a task
taskRouter.route("/add").post(function(req, res) {
	let newTask = {
		name: req.body.name,
		description: req.body.description,
		done: false,
		due: req.body.due
	};
	Task.create(newTask, (err, task) => {
		if (err) {
			res.status(400).send("Unable to create task");
			return;
		}
		console.log("taskRouter.route('/add'): " + JSON.stringify(task));
		// send back the new set of tasks
		Task.find({}).then(function(tasks) {
			res.send(tasks);
			return;
		});
	});
});

// a DELETE to delete a task of given "id" value. Returns all tasks.
taskRouter.route("/delete/:id").delete(function(req, res) {
	var tempId = req.params.id;
	Task.deleteOne({ _id: tempId }, err => {
		if (err) {
			res.status(400).send("Unable to delete task");
			return;
		}
		console.log(`taskRouter.route('/delete/${tempId}')`);
		// send back the new set of tasks
		Task.find({}).then(tasks => {
			res.send(tasks);
			return;
		});
	});
});

// a POST to update a task's data, given its "id" value.
// Returns all tasks.
taskRouter.route("/update/:id").post(function(req, res) {
	var tempId = req.params.id;
	Task.updateOne({ _id: tempId }, req.body, err => {
		if (err) {
			res.status(400).send("Unable to update task");
			return;
		}
		console.log(`taskRouter.route('/update/${tempId}')`);
		// send back the new set of tasks
		Task.find({}).then(tasks => {
			res.send(tasks);
			return;
		});
	});
});

module.exports = taskRouter;
