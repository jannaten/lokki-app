const { isNumber } = require("../../../utils");

describe("number checking", () => {
  it("should return false if no value given", () => {
    const value = isNumber();
    expect(value).not.toBeTruthy();
  });
  it("should return false if string number & letter given", () => {
    const value = isNumber("AB12");
    expect(value).not.toBeTruthy();
  });
  it("should return true if a number given", () => {
    const value = isNumber(123);
    expect(value).toBeTruthy();
  });
});
