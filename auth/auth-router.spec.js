const request = require("supertest");
const server = require("../api/server");

// const User = require("../users/test-users-model");

describe("auth-router.js", () => {
  describe("register endpoint", () => {
    it("should fail & return status code 400", async () => {
      const newUser = {
        username: "treswbvtb",
        password: "Livepure1!",
        First_Name: "Samuel",
        Last_Name: "Torres"
      };

      const failingStatusCode = 400;
      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .set("Content-Type", "application/json")
        .then(res => {
          expect(res.status).toBe(failingStatusCode);
        });
    });
    describe("register endpoint", () => {
      it("should contain object with a message key/val", async () => {
        const res = await request(server).post("/api/auth/register");
        expect(res.body).toMatchObject({ message: "Please, enter an Email" });
      });
    });
  });
  describe("login endpoint", () => {
    it("should fail & return status code 500", async () => {
      const credentials = {
        Email: "rillatube@gmail.com",
        password: "Livepure1!"
      };

      const failingStatusCode = 500;

      return request(server)
        .post("/api/auth/login")
        .send(credentials)
        .set("Content-Type", "application/json")
        .then(res => {
          expect(res.status).toBe(failingStatusCode);
        });
    });
  });
  describe("login endpoint", () => {
    it("Should fail and return an object with an error message and error object containing an error code & number", async () => {
      const credentials = {
        Email: "rillatube@gmail.com",
        password: "Livepure1!"
      };

      return request(server)
        .post("/api/auth/login")
        .send(credentials)
        .set("Content-Type", "application/json")
        .then(res => {
          expect(res.body).toMatchObject({
            Message: "Womp, you suck",
            err: {
              code: "SQLITE_ERROR",
              errno: 1
            }
          });
        });
    });
  });
});
