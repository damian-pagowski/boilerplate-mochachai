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

      it("categories should have required properties", done => {
        chai
          .request(BASE_URL)
          .get("/categories")
          .end((err, res) => {
            assert.equal(res.status, 200);
            const category = res.body[0];
            assert.property(
              category,
              "name",
              "category should have name property"
            );
            assert.property(
              category,
              "path",
              "category should have path property"
            );
            assert.property(
              category,
              "_id",
              "category should have id property"
            );
            done();
          });
      });

      it("creating category", done => {
        chai
          .request(BASE_URL)
          .post("/categories")
          .set("Content-Type", "application/json")
          .send({
            name: "test",
            path: "test"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            console.log(JSON.stringify(res.body));
            assert.property(
              res.body,
              "name",
              "reponse should contain category name"
            );
            assert.property(
              res.body,
              "path",
              "reponse should contain path to category"
            );
            done();
          });
      });
      // bug - status code should be 201
      // some negative cases

      it("creating category - required parameter missing", done => {
        chai
          .request(BASE_URL)
          .post("/categories")
          .set("Content-Type", "application/json")
          .send({
            name: "test"
          })
          .end((err, res) => {
            assert.equal(res.status, 400);
            done();
          });
      });
      // bug..response type should be json but its text
    });
  });

  describe("Posts", function() {
    let post = {};
    describe("GET /posts", function() {
      it("posts should be returned as array", done => {
        chai
          .request(BASE_URL)
          .get("/posts")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.isArray(res.body, "response should be array");
            assert.isNotEmpty(res.body, "at least one post should be returned");
            post = res.body[0];
            done();
          });
      });
    });

    describe("POST /posts", function() {
      it("create a new post", done => {
        chai
          .request(BASE_URL)
          .post("/posts")
          .send({
            category: "5dfa0c0b0c787862501e6a16",
            title: "integration-test-post-title",
            body: "integration-test-post-body",
            author: "integration-test"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.property(
              res.body,
              "_id",
              "response should have property _id"
            );
            assert.property(
              res.body,
              "timestamp",
              "response should have property timestamp"
            );
            assert.property(
              res.body,
              "commentCount",
              "response should have property commentCount"
            );
            assert.property(
              res.body,
              "timestamp",
              "response should have property timestamp"
            );
            assert.property(
              res.body,
              "voteScore",
              "response should have property voteScore"
            );
            done();
          });
      });
      it("createint a new post - missing required parameters", done => {
        chai
          .request(BASE_URL)
          .post("/posts")
          .send({
            title: "integration-test-post-title",
            author: "integration-test"
          })
          .end((err, res) => {
            assert.equal(res.status, 400);
            // assert.equal(
            //   res.type,
            //   "application/json",
            //   "Response should be json"
            // );
            done();
          });
      });
      // bug - no error message
      // bug - response should be json with field - error and messagek
    });

    describe("GET /:category/posts", function() {
      it("get post by category", done => {
        chai
          .request(BASE_URL)
          .get(`/${post.category.name}/posts`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.isArray(res.body, "response should be array");
            assert.isNotEmpty(res.body, "at least one post should be returned");
            assert.include(
              res.body.map(p => p._id),
              post._id,
              "at least one post should be returned"
            );
            done();
          });
      });
    });

    describe("GET /posts/:id", function() {
      it("get post by ID", done => {
        chai
          .request(BASE_URL)
          .get(`/posts/${post._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.property(
              res.body,
              "voteScore",
              "response should have property: voteScore"
            );
            assert.property(
              res.body,
              "title",
              "response should have property: title"
            );
            assert.property(
              res.body,
              "body",
              "response should have property: body"
            );
            assert.property(
              res.body,
              "author",
              "response should have property: author"
            );

            done();
          });
      });
    });
  });
});
