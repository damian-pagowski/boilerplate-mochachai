const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const API_SERVER_URL = "http://localhost:3000";

describe("Integration Tests", () => {
  describe("Integration tests with chai-http", function() {
    describe('GET /hello?name=[name] => "hello [name]"', function() {
      it("Test GET /hello with no name", (done) =>  {
        chai
          .request(API_SERVER_URL)
          .get("/hello")
          .end((err, res) =>  {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "hello Guest",
              "If no name is passed, the endpoint responds with 'hello Guest'"
            );
            done();
          });
      });

      it("Test GET /hello with your name", done => {
        chai
          .request(API_SERVER_URL)
          .get("/hello?name=Damian")
          .end((err, res) =>  {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "hello Damian",
              "endpoint should respond with 'hello Damian'"
            );
            done();
          });
      });
    });

    describe("PUT /travellers", ()=> {
      it('send {surname: "Polo"}', (done) =>  {
        chai
          .request(API_SERVER_URL)
          .put("/travellers") 
          .send({ surname: "Polo" }) 
          .end((err, res) => {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
           assert.equal(
              res.body.name,
              "Marco",
              'res.body.name should be "Marco"'
            );
            assert.equal(
              res.body.surname,
              "Polo",
              'res.body.surname should be "Polo"'
            );
            done();
          });
      });
      it('send {surname: "Colombo"}', (done) =>  {
        chai
          .request(API_SERVER_URL)
          .put("/travellers")
          .send({ surname: "Colombo" })
          .end((err, res) =>  {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(
              res.body.name,
              "Cristoforo",
              'res.body.name should be "Cristoforo"'
            );
            assert.equal(
              res.body.surname,
              "Colombo",
              'res.body.surname should be "Colombo"'
            );
            assert.equal(
              res.body.dates,
              "1451 - 1506",
              "dates should be 1451 - 1506"
            );
            done();
          });
      });

      it('send {surname: "da Verrazzano"}', (done) =>  {
        chai
          .request(API_SERVER_URL)
          .put("/travellers")
          .send({ surname: "da Verrazzano" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(
              res.body.name,
              "Giovanni",
              'res.body.name should be "Giovanni"'
            );
            assert.equal(
              res.body.surname,
              "da Verrazzano",
              'res.body.surname should be "da Verrazzano"'
            );
            assert.equal(
              res.body.dates,
              "1485 - 1528",
              "dates should be 1485 - 1528"
            );
            done();
          });
      });
    });
  });
});
