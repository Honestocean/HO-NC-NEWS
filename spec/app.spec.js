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
        .expect(200);
    });
  });
});
