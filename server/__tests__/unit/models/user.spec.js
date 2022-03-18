// require("dotenv").config();
// const db = require("../../../models");
// const jwt = require("jsonwebtoken");

// const { user } = db;

// describe("user.generateAuthToken", () => {
//   it("should return a valid JWT", () => {
//     const fakeUser = { id: 1, role: "root" };
//     const token = user.generateAuthToken(fakeUser.id, fakeUser.role);
//     const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//     expect(decoded).toMatchObject(fakeUser);
//   });
// });
