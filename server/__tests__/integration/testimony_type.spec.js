require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, testimony_type } = db;
const apiPathRef = "/api/references/type";
const apiPathTestimonyType = "/api/testimony/types";

let selectedTestimonyTypes;
describe("/api/testimony/type", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedTestimonyTypes = body.filter(
      ({ value }) =>
        value === data_types[1].value ||
        value === data_types[2].value ||
        value === data_types[3].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await testimony_type.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query("ALTER TABLE testimony_types AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all testimony types", async () => {
      selectedTestimonyTypes.map(async ({ id }) => {
        await testimony_type.create({ typeReferenceId: id });
      });
      const { body: testimony_type_data, status } = await request(server).get(
        `${apiPathTestimonyType}/find`
      );
      expect(status).toBe(200);
      selectedTestimonyTypes.map(
        async ({ id }) =>
          await expect(
            testimony_type_data.some(
              async (el) => (await el.typeReferenceId) === id
            )
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return testimony types with valid id passed", async () => {
      const testimonyType = await testimony_type.create({
        typeReferenceId: selectedTestimonyTypes[0].id,
      });
      const respond = await request(server).get(
        `${apiPathTestimonyType}/find/${testimonyType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        testimonyType.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathTestimonyType}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathTestimonyType}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathTestimonyType}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create testimony types", async () => {
      const respond = await request(server)
        .post(`${apiPathTestimonyType}/new`)
        .send({ typeReferenceId: selectedTestimonyTypes[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedTestimonyTypes[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathTestimonyType}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathTestimonyType}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedTestimonyTypes[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const cretedTestimonyType = await testimony_type.create({
        typeReferenceId: selectedTestimonyTypes[0].id,
      });
      const respond = await request(server)
        .put(
          `${apiPathTestimonyType}/update/${cretedTestimonyType.dataValues.id}`
        )
        .send({ typeReferenceId: selectedTestimonyTypes[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedTestimonyTypes[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathTestimonyType}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathTestimonyType}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const cretedTestimonyType = await testimony_type.create({
        typeReferenceId: selectedTestimonyTypes[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathTestimonyType}/delete/${cretedTestimonyType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedTestimonyTypes[0].id
      );
    });
  });
});
