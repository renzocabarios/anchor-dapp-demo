import { userService } from "../../app/v1/services";
import { assert } from "chai";
import { connectDB, dropDB, generateString } from "../utils";
import { IUserModel } from "../../app/interfaces";
import { ClientSession, startSession } from "mongoose";

describe("User Service Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should create a user successfully", async () => {
    const session: ClientSession = await startSession();
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data = await userService.create(mock, session);
    assert.equal(mock.firstName, data[0].firstName);
    assert.equal(mock.lastName, data[0].lastName);
  });

  it("should get user by id successfully", async () => {
    const session: ClientSession = await startSession();
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data = await userService.create(mock, session);
    const user = await userService.getById(data[0]._id);
    assert.notEqual(null, user);
  });

  it("should update user successfully", async () => {
    const session: ClientSession = await startSession();

    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const update: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created = await userService.create(mock, session);
    const updated: IUserModel | null = await userService.update(
      created[0]._id,
      update,
      session
    );

    assert.equal(update.firstName, updated?.firstName);
    assert.equal(update.lastName, updated?.lastName);
  });

  it("should delete user successfully", async () => {
    const session: ClientSession = await startSession();

    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created = await userService.create(mock, session);
    await userService.deleteById(created[0]._id, session);

    const user: IUserModel | null = await userService.getById(created[0]._id);

    assert.equal(null, user);
  });

  afterEach(async function () {
    await dropDB();
  });
});
