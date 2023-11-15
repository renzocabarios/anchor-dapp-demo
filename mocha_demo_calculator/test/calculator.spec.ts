// tests/calculator.spec.tx
import { assert } from "chai";
import { add, subtract, multiply, divide } from "../";

describe("Calculator Tests", () => {
  it("should add two random number", () => {
    const a: number = Math.random();
    const b: number = Math.random();

    const result = add(a, b);
    assert.equal(result, a + b);
  });

  it("should subtract two random number", () => {
    const a: number = Math.random();
    const b: number = Math.random();

    const result = subtract(a, b);
    assert.equal(result, a - b);
  });

  it("should multiply two random number", () => {
    const a: number = Math.random();
    const b: number = Math.random();
    const result = multiply(a, b);
    assert.equal(result, a * b);
  });

  it("should divide two random number", () => {
    const a: number = Math.random();
    const b: number = Math.random();

    const result = divide(a, b);
    assert.equal(result, a / b);
  });
});
