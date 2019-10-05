var express = require("express");
var reminderRouter = express.Router();
var Reminder = require("../models/reminder");

// get all reminders from the db
reminderRouter.route("/all").get((req, res) => {
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

// get one random reminder from the db
reminderRouter.route("/random").get((req, res) => {
	console.log("reminderRouter.route('/random')");
	Reminder.find((err, reminders) => {
		if (err) {
			res.status(400).send("Unable to retrieve reminders from server");
			return;
		}
		res.send(reminders[Math.floor(Math.random() * reminders.length)]);
		return;
	});
});

// create a reminder
reminderRouter.route("/add").post((req, res) => {
	let newReminder = {
		remind: req.body.remind,
		remindwhen: req.body.remindwhen,
		remindOnce: req.body.remindOnce,
		labels: req.body.labels
	};
	Reminder.create(newReminder, (err, reminder) => {
		if (err) {
			res.status(400).send("Unable to create reminder");
			return;
		}
		console.log(
			"reminderRouter.route('/add'): " + JSON.stringify(reminder, null, 4)
		);
		// send back the new set of reminders
		Reminder.find((err, reminders) => {
			if (err) {
				res.status(400).send(
					"Unable to retrieve reminders from server"
				);
				return;
			}
			res.json(reminders);
			return;
		});
	});
});

// a DELETE to delete a reminder of given "id" value. Returns all reminders.
reminderRouter.route("/delete/:id").delete((req, res) => {
	var tempId = req.params.id;
	Reminder.deleteOne({ _id: tempId }, err => {
		if (err) {
			res.status(400).send("Unable to delete reminder");
			return;
		}
		console.log(`reminderRouter.route('/delete/${tempId}')`);
		// send back the new set of reminders
		Reminder.find((err, reminders) => {
			if (err) {
				res.status(400).send(
					"Unable to retrieve reminders from server"
				);
				return;
			}
			res.json(reminders);
			return;
		});
	});
});

// a POST to update a reminder's data, given its "id" value.
// Returns all reminders.
reminderRouter.route("/update/:id").post((req, res) => {
	var tempId = req.params.id;
	Reminder.updateOne({ _id: tempId }, req.body, err => {
		if (err) {
			res.status(400).send("Unable to update reminder");
			return;
		}
		console.log(`reminderRouter.route('/update/${tempId}')`);
		// send back the new set of reminders
		Reminder.find((err, reminders) => {
			if (err) {
				res.status(400).send(
					"Unable to retrieve reminders from server"
				);
				return;
			}
			res.json(reminders);
			return;
		});
	});
});

module.exports = reminderRouter;
