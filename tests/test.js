var chai = require('chai')
  , chaiHttp = require('chai-http');

const app = require("../server");

var Task = require('../models/task')

// Configure chai
chai.use(chaiHttp);
chai.should();

// this name value is used literally in update test, after addding this
const dummyNewTask = [{
            name: "Buy plane tickets",
            description: "Buy tix to Seattle for holidays, arriving December 18",
            due: '2019-08-01'
            }];

describe("Task", () => {

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

    describe("GET /api/task/all", () => {
        // Test to get all tasks
        it("should get all tasks", (done) => {
             chai.request(app)
                 .get('/api/task/all')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });

    describe("POST /api/task/add", () => {
        // Test to get all tasks
        it("adding dummy task; should get all tasks", (done) => {
             chai.request(app)
                 .post('/api/task/add')
                 .send(dummyNewTask)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });

// TO-DO — need to retrieve valid id values for testing the next 2 functions

    describe("POST /api/task/update/1", () => {
        // Test to get all tasks
        it("update task at position 1; should get all tasks", (done) => {
             chai.request(app)
                 .post('/api/task/update/1')
                 .send(dummyNewTask)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });


    describe("DELETE /api/task/delete/2", () => {
        // Test to get all tasks
        it("delete task at position 2; should get all tasks", (done) => {
             chai.request(app)
                 .delete('/api/task/delete/2')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     done();
                  });
         });
    });


});