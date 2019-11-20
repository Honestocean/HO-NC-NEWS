process.env.NODE_ENV = "test";

const app = require("../app.js");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../db/connection");

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
          expect(response.body.msg).to.eql("invalid id");
        });
    });
    it.only("patch:202, respond with inc_votes and newVote and an updated article", () => {
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
  });
});
