var express = require('express');
var taskRouter = express.Router();
var Task = require('../models/task')

// get all todo items in the db
taskRouter.route('/all').get(function (req, res, next) {
	console.log("taskRouter.route('/all')");
	Task.find(function (err, tasks) {
	    if (err) { return next(new Error(err)) }
	    res.json(tasks)
	})
})

// add a task
taskRouter.route('/add').post(function (req, res) {
	newTask = {
		  	name: req.body.name,
		  	description: req.body.description,
		  	done: false,
		   	due: req.body.due,
	};
	Task.create( newTask, function (error, task) {
		if (error) {
		    res.status(400).send('Unable to create task')
		}
		console.log("taskRouter.route('/add') added: " + JSON.stringify(task));
		// send back the new set of tasks
	   	Task.find({}).then(function (tasks) {
			res.send(tasks);
		});
	})
})

// a DELETE to delete a task of given "id" value. Returns all tasks.
taskRouter.route('/delete/:id').delete(function (req, res) {
  var tempId = req.params.id
  Task.deleteOne({_id: tempId}, function (err, task) {
    if (err) {
      return next(new Error('Task was not found'))
    }
		// send back the new set of tasks
	   	Task.find({}).then(function (tasks) {
			res.send(tasks);
		});
  })
})

// a POST to update a task's data state, given its "id" value.
// Returns all tasks.
taskRouter.route('/update/:id').post(function (req, res) {
  	var tempId = req.params.id
	Task.updateOne({ _id: tempId }, req.body, (err) => {
		if (err) { return next(new Error(err)) }
	});

	// send back the new set of tasks
   	Task.find({}).then(function (tasks) {
		res.send(tasks);
	});
})

module.exports = taskRouter