const { randomString } = require("../../../utils");

describe("random string checking", () => {
  it("should return null if no str given", () => {
    const str = randomString();
    expect(str.length).toBe(0);
  });
  it("should return given length character str", () => {
    const str = randomString(10);
    expect(str.length).toBe(10);
  });
  it("should return given length character with given charset", () => {
    const str = randomString(6, "ABCDEF");
    expect(str.length).toBe(6);
    for (let i = 0; i < str.length; i++) {
      expect(str).toContain(str[i]);
    }
  });
});
