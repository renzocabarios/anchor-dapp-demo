import { IUserModel } from "../app/types";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateString(length = 5) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function generateMockUser(): IUserModel {
  return {
    firstName: generateString(),
    lastName: generateString(),
    password: generateString(),
    email: `${generateString()}@gmail.com`,
  };
}
