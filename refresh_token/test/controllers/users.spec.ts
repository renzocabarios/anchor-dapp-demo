import { connectDB, dropDB } from "../db";
import userService from "../../app/routes/v1/users/service";
import { assert } from "chai";
import { generateMockUser } from "../utils";
import { IUserModel } from "../../app/types";
import { ClientSession, startSession } from "mongoose";
import supertest from "supertest";
import app from "../../config";

describe("User Controller Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("it should create user", function (done) {
    const mock = generateMockUser();
    supertest(app)
      .post("/api/v1/users")
      .send(mock)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.equal(data[0].firstName, mock.firstName);
        assert.equal(data[0].lastName, mock.lastName);
        assert.equal(data[0].email, mock.email);
        assert.equal(data[0].password, mock.password);
      })
      .end(done);
  });

  it("it should get users", async function () {
    const session: ClientSession = await startSession();
    const mock: IUserModel = generateMockUser();
    await userService.add(mock, session);
    return supertest(app)
      .get("/api/v1/users")
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.isAbove(data.length, 0);
      });
  });

  it("it should get a user", async function () {
    const session: ClientSession = await startSession();
    const mock = await userService.add(generateMockUser(), session);
    return supertest(app)
      .get(`/api/v1/users/${mock[0]._id}`)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.isAbove(data.length, 0);
        assert.equal(data[0].firstName, mock[0].firstName);
      });
  });

  it("should update user successfully", async () => {
    const session: ClientSession = await startSession();
    const mock: IUserModel = generateMockUser();
    const update: IUserModel = generateMockUser();
    const created = await userService.add(mock, session);
    return supertest(app)
      .patch(`/api/v1/users/${created[0]?._id}`)
      .send(update)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.equal(data[0].firstName, update.firstName);
        assert.equal(data[0].lastName, update.lastName);
        assert.equal(data[0].email, update.email);
        assert.equal(data[0].password, update.password);
      });
  });

  it("should delete user successfully", async () => {
    const session: ClientSession = await startSession();
    const mock: IUserModel = generateMockUser();
    const created = await userService.add(mock, session);
    return supertest(app)
      .delete(`/api/v1/users/${created[0]?._id}`)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.equal(res.body.status, "success");
      });
  });

  afterEach(async function () {
    await dropDB();
  });
});
