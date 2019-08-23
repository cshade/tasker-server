var express = require("express");
var reminderRouter = express.Router();
var Reminder = require("../models/reminder");

// get all reminders from the db
reminderRouter.route("/all").get(function(req, res) {
	console.log("reminderRouter.route('/all')");
	Reminder.find((err, reminders) => {
		if (err) {
			res.status(400).send("Unable to retrieve reminders from server");
			return;
		}
		res.json(reminders);
		return;
	});
});

// create a reminder
reminderRouter.route("/add").post(function(req, res) {
	let newReminder = {
		remind: req.body.remind,
		remindwhen: req.body.remindwhen
	};
	Reminder.create(newReminder, (err, reminder) => {
		if (err) {
			res.status(400).send("Unable to create reminder");
			return;
		}
		console.log(
			"reminderRouter.route('/add'): " + JSON.stringify(reminder)
		);
		// send back the new set of reminders
		Reminder.find({}).then(reminders => {
			res.send(reminders);
			return;
		});
	});
});

// a DELETE to delete a reminder of given "id" value. Returns all reminders.
reminderRouter.route("/delete/:id").delete(function(req, res) {
	var tempId = req.params.id;
	Reminder.deleteOne({ _id: tempId }, err => {
		if (err) {
			res.status(400).send("Unable to delete reminder");
			return;
		}
		console.log(`reminderRouter.route('/delete/${tempId}')`);
		// send back the new set of reminders
		Reminder.find({}).then(reminders => {
			res.send(reminders);
			return;
		});
	});
});

// a POST to update a reminder's data, given its "id" value.
// Returns all reminders.
reminderRouter.route("/update/:id").post(function(req, res) {
	var tempId = req.params.id;
	Reminder.updateOne({ _id: tempId }, req.body, err => {
		if (err) {
			res.status(400).send("Unable to update reminder");
			return;
		}
		console.log(`reminderRouter.route('/update/${tempId}')`);
		// send back the new set of reminders
		Reminder.find({}).then(reminders => {
			res.send(reminders);
			return;
		});
	});
});

module.exports = reminderRouter;
