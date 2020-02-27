const chai = require("chai");
const assert = require("chai").assert;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const BASE_URL = "https://damian-discussion-api-server.herokuapp.com";

describe("Discussion-api-server integration tests", () => {
  describe("Categories", function() {
    describe("GET /categories", function() {
      it("should return array", done => {
        chai
          .request(BASE_URL)
          .get("/categories")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.isArray(res.body, "response should be array");
            assert.isNotEmpty(
              res.body,
              "at least one category should be returned"
            );
            done();
          });
      });
    });
  });
});
