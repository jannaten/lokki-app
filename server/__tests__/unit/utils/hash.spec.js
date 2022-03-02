const bcrypt = require("bcrypt");
const { hash_password } = require("../../../utils");

describe("hashing password", () => {
  it("should return a undefined if no password given", () => {
    const hash = hash_password();
    expect(hash).toMatchObject({});
  });
  it("should give salt with matching value", async () => {
    const mockSalt = jest
      .fn()
      .mockImplementation(async (val) => await bcrypt.genSalt(val));
    const salt = await mockSalt(10);
    expect(salt).toMatch(/10/);
  });
  it("should give password hash if password has given", async () => {
    const hash = await hash_password({ password: "abc" });
    expect(hash.length).toBe(60);
    expect(hash).not.toBe("abc");
  });
});
