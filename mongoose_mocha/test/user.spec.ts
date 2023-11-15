import { connectDB, dropDB } from "../db";
import model, { IUserModel } from "../";
import { assert } from "chai";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length = 5) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

describe("User Database Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should create a user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data = await model.create(mock);
    assert.equal(mock.firstName, data.firstName);
    assert.equal(mock.lastName, data.lastName);
  });

  it("should get user by id successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data: IUserModel = await model.create(mock);
    const user = await model.findOne({ _id: data._id, deleted: false });

    assert.notEqual(null, user);
  });

  it("should update user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const update: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created: IUserModel = await model.create(mock);
    const updated: IUserModel | null = await model.findOneAndUpdate(
      { _id: created._id },
      update,
      { new: true }
    );

    assert.equal(update.firstName, updated?.firstName);
    assert.equal(update.lastName, updated?.lastName);
  });

  it("should delete user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created: IUserModel = await model.create(mock);
    await model.findOneAndUpdate(
      { _id: created._id },
      { deleted: true },
      { new: true }
    );

    const user: IUserModel | null = await model.findOne({
      _id: created._id,
      deleted: false,
    });

    assert.equal(null, user);
  });

  afterEach(async function () {
    await dropDB();
  });
});
