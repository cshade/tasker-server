var mongoose = require("mongoose");

// No secondary indexes are required so far.
// All the queries rely on the MongoDB _id value.
// NOTE: For this reason, the connection (in server.js)
// has autoIndex: false.
var reminderSchema = new mongoose.Schema(
	{
		remind: {
			type: String,
			required: true
		},
		remindwhen: {
			type: Date,
			default: Date.now
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
