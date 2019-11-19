process.env.NODE_ENV = "test";

const app = require("../app.js");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
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
  });

  describe.only("/articles", () => {
    it("GET:200, respond with a single article object matching the request id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          console.log("back to the spec");
        });
    });
  });
});
