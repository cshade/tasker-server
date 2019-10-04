var mongoose = require("mongoose");

// Define collection and schema for todo item
var reminderSchema = new mongoose.Schema(
	{
		remind: {
			type: String
		},
		remindwhen: {
			type: Date
		},
		remindonce: {
			type: Boolean,
			default: true
		},
		labels: {
			type: Array
		}
	},
	{
		collection: "reminders"
	}
);

module.exports = mongoose.model("Reminder", reminderSchema);
