import { assert } from "chai";
import { connectDB, dropDB, generateUser } from "../utils";
import supertest from "supertest";
import { app } from "../../";

describe("Users controller", function () {
  beforeEach(async function () {
    await connectDB();
  });

  it("it should get users", function (done) {
    supertest(app)
      .get("/api/v1/users")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it should create user", function (done) {
    const mock = generateUser();
    supertest(app)
      .post("/api/v1/users")
      .send(mock)
      .expect(200)
      .end(function (err, res) {
        const data = res.body.data;
        if (data[0].firstName != mock.firstName)
          done({ message: "Firstname not the same" });

        if (data[0].lastName != mock.lastName)
          done({ message: "LastName not the same" });
        if (err) done(err);
        done();
      });
  });

  it("it should update user", function (done) {
    const mock = generateUser();
    const update = generateUser();

    const agent = supertest(app);
    agent
      .post("/api/v1/users")
      .send(mock)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.equal(data[0].firstName, mock.firstName);
        assert.equal(data[0].lastName, mock.lastName);
      })
      .end(function (err, res) {
        const data = res.body.data;
        agent
          .patch(`/api/v1/users/${data[0]._id}`)
          .send(update)
          .expect(200)
          .expect(function (res) {
            const updated = res.body.data;
            assert.equal(updated[0].firstName, update.firstName);
            assert.equal(updated[0].lastName, update.lastName);
          })
          .end(done);
      });
  });

  it("it should delete user", function (done) {
    const mock = generateUser();
    const agent = supertest(app);
    agent
      .post("/api/v1/users")
      .send(mock)
      .expect(200)
      .expect(function (res) {
        const data = res.body.data;
        assert.equal(data[0].firstName, mock.firstName);
        assert.equal(data[0].lastName, mock.lastName);
      })
      .end(function (err, res) {
        agent
          .delete(`/api/v1/users/${res.body.data[0]._id}`)
          .expect(200)
          .end(function (err, res) {
            agent
              .get(`/api/v1/users`)
              .expect(200)
              .expect(function (res) {
                const data = res.body.data;
                assert.isTrue(data.length === 0);
              })
              .end(done);
          });
      });
  });

  afterEach(async function () {
    await dropDB();
  });
});
