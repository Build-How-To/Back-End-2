const request = require("supertest");
const server = require("../api/server");

describe("user-router.js", () => {
  describe("users get endpoint", () => {
    it("send a request and fails with status code 400", async () => {
      let res = await request(server).get("/api/users/");
      expect(res.status).toBe(400);
    });
  });
  describe("users get endpoint", () => {
    it("send a request and fails due to not being logged in", async () => {
      let res = await request(server).get("/api/users/");
      expect(res.body).toMatchObject({ message: "Please login & try again" });
    });
  });
});
