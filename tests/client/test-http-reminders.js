var chai = require("chai"),
    chaiHttp = require("chai-http");
var config = require("../../config");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Reminder API Tests - OVER HTTP", () => {
    let dummyNewReminder; // will be set to res.body[0]

    const testKey = "remind";

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
                        //     `/add res.body = ${JSON.stringify(
                        //         res.body,
                        //         null,
                        //         4
                        //     )}`
                        // );
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body[0].should.have.property(testKey);
                        // TO DO: assert testReminderBones[0] is in response data
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
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });
    });
});
