var mongoose = require("mongoose");
var Task = require("../models/task");
const assert = require("assert");

describe("Task API Tests - DATABASE, SCHEMA, MODEL", () => {
    let _idUsed = "null";

    const testTaskBones = [
        {
            name: "Buy plane tickets",
            description:
                "Buy tix to Seattle for holidays, arriving December 18",
            due: "2019-08-01",
            labels: ["issue 7", "travel", "holidays"]
        },
        {
            name: "Eat more fruit",
            description: "Buy watermelon and cantelope",
            due: "2019-08-12"
        },
        {
            name: "Check beach for starfish",
            description: "Take a long walk on Pensacola Beach",
            due: "2019-09-22"
        }
    ];

    // Before starting tests, create a sandboxed database connection
    // Once a connection is established invoke done()
    before(done => {
        mongoose.connect("mongodb://localhost:27017/testTaskDatabase", {
            useNewUrlParser: true
        });
        const db = mongoose.connection;
        db.on(
            "error",
            console.error.bind(console, "before: Error connecting to db")
        );
        db.once("open", () => {
            // console.log("before: Established connection to db");
            done();
        });
    });

    describe("Database CRUD Tests - in sandboxed testTaskDatabase", () => {
        describe("CREATE and READ", () => {
            it("should create a task", done => {
                // NOTE: task name and _id are used later in a retrieve test
                Task.create({ name: "blueberry pie" }, (err, task) => {
                    try {
                        assert(task._id); // if saved, _id will exist
                        assert(task.name === "blueberry pie");
                        _idUsed = task._id;
                        // console.log(`save _id = ${task._id} | name = ${task.name}`);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });

            it("should insertMany tasks", done => {
                Task.insertMany(testTaskBones, (err, tasks) => {
                    try {
                        assert(tasks.length);
                        // console.log(`inserted this many = ${tasks.length}`);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });

            it("should retrieve (find) all tasks, with no params", done => {
                Task.find((err, tasks) => {
                    // console.log(
                    //     `retrieve _id = ${tasks[0]._id} | name = ${tasks[0].name}`
                    // );
                    try {
                        assert(tasks.length);
                        // console.log(`retrieved this many = ${tasks.length}`);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });

            it("should findOne task by _id", done => {
                Task.findOne({ _id: _idUsed }).then(task => {
                    // console.log(`retrieve _id = ${task._id} | name = ${task.name}`);
                    // console.log(`retrieve _idUsed = ${_idUsed}`);
                    try {
                        assert(task._id.toString() == _idUsed);
                        assert(task.name == "blueberry pie");
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
        });

        describe("UPDATE and DELETE", () => {
            it("should updateOne task by _id (then findOne)", done => {
                Task.updateOne({ _id: _idUsed }, { name: "apple pie" }, err => {
                    if (err) {
                        done(err);
                    } else {
                        Task.findOne({ _id: _idUsed }).then(task => {
                            try {
                                assert(task.name == "apple pie");
                                done();
                            } catch (e) {
                                done(e);
                            }
                        });
                    }
                });
            });

            it("should deleteOne task by _id (then findOne)", done => {
                Task.deleteOne({ _id: _idUsed }, err => {
                    if (err) {
                        done(err);
                    } else {
                        Task.findOne({ _id: _idUsed }).then(task => {
                            try {
                                assert(task == null);
                                done();
                            } catch (e) {
                                done(e);
                            }
                        });
                    }
                });
            });
        });
    });

    //After all tests are finished drop database and close connection
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});
