var chai = require('chai')
  , chaiHttp = require('chai-http');

const app = require("../server");

// Configure chai
chai.use(chaiHttp);
chai.should();

const dummyNewTask = [{
            name: "Buy plane tickets",
            description: "Buy tix to Seattle for holidays, arriving December 18",
            due: '2019-08-01'
            }];

const dummyUpdateTask = [{
            id: "5",
            name: "Sched coffee w Jason",
            description: "Schedule at a coffee shop in the East Village.",
            done: false,
            due: "2019-12-01"
            }];

describe("Tasks", () => {

    describe("GET /api", () => {
        // Test to get all tasks
        it("should return message rather than error", (done) => {
             chai.request(app)
                 .get('/api')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });

    describe("GET /api/tasks", () => {
        // Test to get all tasks
        it("should get all tasks", (done) => {
             chai.request(app)
                 .get('/api/tasks')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });

    describe("POST /api/tasks/add", () => {
        // Test to get all tasks
        it("adding dummy task; should get all tasks", (done) => {
             chai.request(app)
                 .post('/api/tasks/add')
                 .send(dummyNewTask)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });

    describe("DELETE /api/tasks/delete/1", () => {
        // Test to get all tasks
        it("delete task at position 1; should get all tasks", (done) => {
             chai.request(app)
                 .delete('/api/tasks/delete/1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });

    describe("POST /api/tasks/update/0", () => {
        // Test to get all tasks
        it("requesting to update with invalid task id", (done) => {
             chai.request(app)
                 .post('/api/tasks/update/0')
                 .send(dummyUpdateTask)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });

    describe("POST /api/tasks/update/5", () => {
        // Test to get all tasks
        it("update task at position 5; should get all tasks", (done) => {
             chai.request(app)
                 .post('/api/tasks/update/5')
                 .send(dummyUpdateTask)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });
});