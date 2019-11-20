process.env.NODE_ENV = "test";

const app = require("../app.js");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../db/connection");
const chai = require("chai");
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/notAroute", () => {
    it('GET:404, expect message "Route not found"', () => {
      return request(app)
        .get("/invalidRoute")
        .expect(404)
        .then(response => {
          expect(response.text).to.eql("Route not found");
        });
    });
  });
  describe("/topics", () => {
    it("GET:200, respond with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.contain.keys("slug", "description");
        });
    });
  });

  describe("/users", () => {
    it("GET:200, respond with a single object matching the request", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.user).to.be.an("array");
          expect(body.user[0]).to.contain.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });

    it("GET:404, responds with an error message when failing to get article", () => {
      return request(app)
        .get("/api/users/squ11ble")
        .expect(404)
        .then(response => {
          expect(response.body).to.eql({
            msg: "article does not exist"
          });
        });
    });
  });

  describe("/articles", () => {
    it("GET:200, respond with a single article object matching the request id", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.article).to.be.an("array");
          expect(body.article[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("GET:404, responds with an error message when failing to get article", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(response => {
          console.log(response.body);
          expect(response.body).to.eql({
            msg: "article does not exist"
          });
        });
    });
    it("Get:400, responds with a psql error message", () => {
      return request(app)
        .get("/api/articles/a")
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.text).to.eql("invalid id or body input");
        });
    });
    it("patch:202, respond with inc_votes and newVote and an updated article", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ inc_votes: 1 })
        .expect(202)
        .then(({ body }) => {
          expect(body.article).to.be.an("array");
          expect(body.article[0]).to.contain.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
        });
    });
    it("patch:400, body submitted without 'inc_votes'responds with unmodified article", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({})
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.eql("invalid body submitted");
        });
    });
    it("patch:400, invalid in_votes responds with 400 and error message", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ inc_votes: "a" })
        .expect(400)
        .then(response => {
          expect(response.text).to.eql("invalid id or body input");
        });
    });
    it("patch:400, extra property added respond with 400", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ inc_votes: "a" })
        .expect(400)
        .then(response => {
          expect(response.text).to.eql("invalid id or body input");
        });
    });
    it("post:201, succesfully post a new comment object to the data", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "lurker",
          body: "an amazing comment"
        })
        .expect(201)
        .then(response => {
          console.log(response.body);
          expect(response.body).to.be.an("object");
          expect(response.body.comment).to.be.an("array");
          expect(response.body.comment[0]).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("post:400, no body sent return 400", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({})
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.eql("invalid body of submitted post");
        });
    });
    it("post:404, invalid id, handle a psql error, return error message", () => {
      return request(app)
        .post("/api/articles/99999/comments")
        .send({
          username: "lurker",
          body: "an amazing comment"
        })
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("invalid id when attempting to post");
        });
    });
    it("post:400, invalid articleId submitted, return error message", () => {
      return request(app)
        .post("/api/articles/a/comments")
        .send({ username: "lurker", body: "an amazing comment" })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal("invalid id or body input");
        });
    });
    it("post:404, comment posted by a user that does not exist, return err message", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "simon", body: "an average comment" })
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("invalid id when attempting to post");
        });
    });
    it("get:200, returns an array of comments with the give article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("array");
          expect(response.body[0]).to.be.an("object");
          expect(response.body[0]).to.contain.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
    });
    it("get:200, returns an array sorted by any valid column input", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.sortedBy("votes", {
            descending: true
          });
        });
    });
    it("get:200, returns an array sorted by any valid column input and chosen order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes&&order=desc")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.sortedBy("votes", {
            descending: true
          });
        });
    });
    it("get:404, non-existant id input, error message returned", () => {
      return request(app)
        .get("/api/articles/20000/comments")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("id not found");
        });
    });
    it.only("get:400, invalid input, send error message", () => {
      return request(app)
        .get("/api/articles/a/comments")
        .expect(400)
        .then(response => {
          console.log("in the spec");
        });
    });
  });
});
