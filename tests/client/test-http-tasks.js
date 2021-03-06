var chai = require("chai"),
    chaiHttp = require("chai-http");
var config = require("../../config");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Task API Tests - OVER HTTP", () => {
    // don't use the Mongoose model here — we're emulating a client
    let dummyNewTask; // will be set to res.body[0]

    const testKey = "name";

    // only using [0] position for now
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

    describe("GET /api", () => {
        it("should return message rather than error", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .get("/api")
                .end((err, res) => {
                    try {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    describe("POST /api/task/add", () => {
        it("should add task; receive all tasks", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .post("/api/task/add")
                .send(testTaskBones[0])
                .end((err, res) => {
                    try {
                        // console.log(
                        //     `/add res.body[0] = ${JSON.stringify(
                        //         res.body[0],
                        //         null,
                        //         4
                        //     )}`
                        // );
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body[0].should.have.property(testKey);
                        // assert testTaskBones[0] is in response data
                        let tempVal;
                        let assertResult = false;
                        for (var i = 0; i < res.body.length; i++) {
                            tempVal = res.body[i].name;
                            // console.log(
                            //     "DEBUG /task/add : " + i + ", " + tempVal
                            // );
                            if (tempVal == testTaskBones[0].name) {
                                assertResult = true;
                            }
                        }
                        assertResult.should.equal(true);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    describe("GET /api/task/all", () => {
        it("should get all tasks", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .get("/api/task/all")
                .end((err, res) => {
                    // console.log(
                    //     `get all res.body[0] = ${JSON.stringify(res.body[0], null, 4)}`
                    // );
                    dummyNewTask = res.body[0];
                    try {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body[0].should.have.property(testKey);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    describe("POST /api/task/update/<_id>", () => {
        it("update task; should get all tasks", done => {
            dummyNewTask.due = "2020-08-12"; // change something
            chai.request(`http://localhost:${config.APP_PORT}`)
                .post("/api/task/update/" + dummyNewTask._id)
                .send(dummyNewTask)
                .end((err, res) => {
                    try {
                        // reset dummyNewTask from latest
                        dummyNewTask = res.body[0];
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    describe("GET /api/task/random", () => {
        it("random task; should return one task", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .get("/api/task/random")
                .end((err, res) => {
                    try {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    describe("DELETE /api/task/delete/<_id>", () => {
        it("delete task; should get all tasks", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .delete("/api/task/delete/" + dummyNewTask._id)
                .end((err, res) => {
                    // console.log(
                    //     `/delete res.body = ${JSON.stringify(
                    //         res.body,
                    //         null,
                    //         4
                    //     )}`
                    // );
                    try {
                        res.should.have.status(200);
                        res.should.be.json;
                        // assert dummyNewTask._id is NOT in response data
                        let tempVal;
                        let assertResult = true; // assume it's not here
                        for (var i = 0; i < res.body.length; i++) {
                            tempVal = res.body[i]._id;
                            // console.log(
                            //     `DEBUG /task/delete : ${i}, ${tempVal}, ${res.body[i].name}`
                            // );
                            if (tempVal == dummyNewTask._id) {
                                assertResult = false;
                            }
                        }
                        assertResult.should.equal(true);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });

    //After all tests are finished, check for leftovers in database
    after(done => {
        chai.request(`http://localhost:${config.APP_PORT}`)
            .get("/api/task/all")
            .end((err, res) => {
                console.log(
                    `INFO /after /task/all remaining in db = ${JSON.stringify(
                        res.body,
                        null,
                        4
                    )}`
                );
                try {
                    let tempVal;
                    for (var i = 0; i < res.body.length; i++) {
                        tempVal = res.body[i].name;
                        if (tempVal == testTaskBones[0].name) {
                            console.log(
                                `DEBUG task /after deleting :  ${i}, ${tempVal}`
                            );
                            chai.request(`http://localhost:${config.APP_PORT}`)
                                .delete("/api/task/delete/" + res.body[i]._id)
                                .end();
                        }
                    }
                    done();
                } catch (e) {
                    done(e);
                }
            });
    });
});
