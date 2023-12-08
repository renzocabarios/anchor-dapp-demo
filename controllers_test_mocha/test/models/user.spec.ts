import { userModel } from "../../app/routes/v1/models";
import { assert } from "chai";
import { connectDB, dropDB, generateString, generateUser } from "../utils";
import { IUserModel } from "../../app/interfaces";

describe("User Model Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should create a user successfully", async () => {
    const mock: IUserModel = generateUser();
    const data = await userModel.create(mock);
    assert.equal(mock.firstName, data.firstName);
    assert.equal(mock.lastName, data.lastName);
  });

  it("should get user by id successfully", async () => {
    const mock: IUserModel = generateUser();
    const data: IUserModel = await userModel.create(mock);
    const user = await userModel.findOne({ _id: data._id, deleted: false });
    assert.notEqual(null, user);
  });

  it("should update user successfully", async () => {
    const mock: IUserModel = generateUser();
    const update: IUserModel = generateUser();

    const created: IUserModel = await userModel.create(mock);
    const updated: IUserModel | null = await userModel.findOneAndUpdate(
      { _id: created._id },
      update,
      { new: true }
    );

    assert.equal(update.firstName, updated?.firstName);
    assert.equal(update.lastName, updated?.lastName);
  });

  it("should delete user successfully", async () => {
    const mock: IUserModel = generateUser();
    const created: IUserModel = await userModel.create(mock);
    await userModel.findOneAndUpdate(
      { _id: created._id },
      { deleted: true },
      { new: true }
    );

    const user: IUserModel | null = await userModel.findOne({
      _id: created._id,
      deleted: false,
    });

    assert.equal(null, user);
  });

  afterEach(async function () {
    await dropDB();
  });
});
