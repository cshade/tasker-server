var mongoose = require("mongoose");

// Define collection and schema for todo item
var taskSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    due: {
      type: Date
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
