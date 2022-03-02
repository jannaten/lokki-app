require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, user_type } = db;
const apiPathRef = "/api/references/type";
const apiPathUserType = "/api/users/types";

let selectedUserTypes;
describe("/api/user/type", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedUserTypes = body.filter(
      ({ value }) =>
        value === data_types[0].value ||
        value === data_types[1].value ||
        value === data_types[2].value ||
        value === data_types[3].value ||
        value === data_types[4].value ||
        value === data_types[5].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await user_type.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query("ALTER TABLE user_types AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all user types", async () => {
      selectedUserTypes.map(async ({ id }) => {
        await user_type.create({ typeReferenceId: id });
      });
      const { body: user_type_data, status } = await request(server).get(
        `${apiPathUserType}/find`
      );
      expect(status).toBe(200);
      selectedUserTypes.map(
        async ({ id }) =>
          await expect(
            user_type_data.some(async (el) => (await el.typeReferenceId) === id)
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return user types with valid id passed", async () => {
      const userType = await user_type.create({
        typeReferenceId: selectedUserTypes[0].id,
      });
      const respond = await request(server).get(
        `${apiPathUserType}/find/${userType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        userType.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathUserType}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathUserType}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathUserType}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create user types", async () => {
      const respond = await request(server)
        .post(`${apiPathUserType}/new`)
        .send({ typeReferenceId: selectedUserTypes[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedUserTypes[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathUserType}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathUserType}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedUserTypes[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const cretedUserType = await user_type.create({
        typeReferenceId: selectedUserTypes[0].id,
      });
      const respond = await request(server)
        .put(`${apiPathUserType}/update/${cretedUserType.dataValues.id}`)
        .send({ typeReferenceId: selectedUserTypes[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedUserTypes[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathUserType}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathUserType}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const cretedUserType = await user_type.create({
        typeReferenceId: selectedUserTypes[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathUserType}/delete/${cretedUserType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedUserTypes[0].id
      );
    });
  });
});
