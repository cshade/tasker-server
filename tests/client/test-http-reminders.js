var chai = require("chai"),
    chaiHttp = require("chai-http");
var config = require("../../config");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Reminder API Tests - OVER HTTP", () => {
    // don't use the Mongoose model here — we're emulating a client
    let dummyNewReminder; // will be set to res.body[0]

    const testKey = "remind";

    // only using [0] position for now
    const testReminderBones = [
        {
            remind: "Reserve table at Brooklyn Book Fest",
            remindwhen: "2020-06-01",
            labels: ["festival", "books"]
        },
        {
            remind: "Reserve table at CLMP Press Fest",
            remindwhen: "2020-12-01"
        }
    ];

    describe("POST /api/reminder/add", () => {
        it("should add reminder; receive all reminder", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .post("/api/reminder/add")
                .send(testReminderBones[0])
                .end((err, res) => {
                    try {
                        // console.log(
                        //     `INFO /reminder/all remaining = ${JSON.stringify(
                        //         res.body,
                        //         null,
                        //         4
                        //     )}`
                        // );
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body[0].should.have.property(testKey);
                        // assert testReminderBones[0] is in response data
                        let tempVal;
                        let assertResult = false;
                        for (var i = 0; i < res.body.length; i++) {
                            tempVal = res.body[i].remind;
                            // console.log(
                            //     "DEBUG /reminder/add : " + i + ", " + tempVal
                            // );
                            if (tempVal == testReminderBones[0].remind) {
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

    describe("GET /api/reminder/all", () => {
        it("should get all reminders", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .get("/api/reminder/all")
                .end((err, res) => {
                    // console.log(
                    //     `get all res.body[0] = ${JSON.stringify(res.body[0], null, 4)}`
                    // );
                    dummyNewReminder = res.body[0];
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

    describe("GET /api/reminder/random", () => {
        it("should get a random reminder", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .get("/api/reminder/random")
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

    describe("POST /api/reminder/update/<_id>", () => {
        it("update reminder; should get all reminders", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .post("/api/reminder/update/" + dummyNewReminder._id)
                .send(dummyNewReminder)
                .end((err, res) => {
                    // reset dummyNewReminder from latest
                    dummyNewReminder = res.body[0];
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

    describe("DELETE /api/reminder/delete/<_id>", () => {
        it("delete reminder; should get all reminders", done => {
            chai.request(`http://localhost:${config.APP_PORT}`)
                .delete("/api/reminder/delete/" + dummyNewReminder._id)
                .end((err, res) => {
                    try {
                        // console.log(
                        //     `/delete res.body = ${JSON.stringify(
                        //         res.body,
                        //         null,
                        //         4
                        //     )}`
                        // );
                        res.should.have.status(200);
                        res.should.be.json;
                        // assert dummyNewReminder._id is NOT in response data
                        let tempVal;
                        let assertResult = true; // assume it's not here
                        for (var i = 0; i < res.body.length; i++) {
                            tempVal = res.body[i]._id;
                            // console.log(
                            //     `DEBUG /reminder/delete : ${i}, ${tempVal}, ${res.body[i].remind}`
                            // );
                            if (tempVal == dummyNewReminder._id) {
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
            .get("/api/reminder/all")
            .end((err, res) => {
                console.log(
                    `INFO /after /reminder/all remaining in db = ${JSON.stringify(
                        res.body,
                        null,
                        4
                    )}`
                );
                try {
                    let tempVal;
                    for (var i = 0; i < res.body.length; i++) {
                        tempVal = res.body[i].remind;
                        if (tempVal == testReminderBones[0].remind) {
                            console.log(
                                `DEBUG reminder /after deleting :  ${i}, ${tempVal}`
                            );
                            chai.request(`http://localhost:${config.APP_PORT}`)
                                .delete(
                                    "/api/reminder/delete/" + res.body[i]._id
                                )
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
