var mongoose = require("mongoose");

// No secondary indexes are required so far.
// All the queries rely on the MongoDB _id value.
// NOTE: For this reason, the connection (in server.js)
// has autoIndex: false.
var taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    due: {
      type: Date,
      default: Date.now
    },
    done: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Array
    }
  },
  {
    collection: "tasks"
  }
);

module.exports = mongoose.model("Task", taskSchema);
