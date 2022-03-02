require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference } = db;
const apiPath = "/api/references/type";

describe("/api/references/type", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all type references", async () => {
      data_types.map(async (el) => {
        await type_reference.create(el);
      });
      const respond = await request(server).get(`${apiPath}/find`);
      expect(respond.status).toBe(200);
      data_types.map(
        async ({ value }) =>
          await expect(
            respond.body.some(async (el) => (await el.value) === value)
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return type references with valid id passed", async () => {
      const refType = await type_reference.create({
        value: data_types[0].value,
      });
      const respond = await request(server).get(
        `${apiPath}/find/${refType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty("value", refType.dataValues.value);
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(`${apiPath}/find/${invalidId}`);
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPath}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const minChar = randomString(2);
    const maxChar = randomString(65);
    it("should give error if character is less than 3", async () => {
      const respond = await request(server)
        .post(`${apiPath}/new`)
        .send({ value: minChar });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/3 characters long/);
    });
    it("should give error if character is less than 3", async () => {
      const respond = await request(server)
        .post(`${apiPath}/new`)
        .send({ value: maxChar });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/64 characters long/);
    });
    it("should create type references", async () => {
      const respond = await request(server)
        .post(`${apiPath}/new`)
        .send({ value: data_types[0].value });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty("value", data_types[0].value);
    });
  });
  describe("PUT /update/:id", () => {
    const minChar = randomString(2);
    const maxChar = randomString(65);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPath}/update/${inValidId}`)
        .send({ value: `${data_types[0].value}new` });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPath}/update/${idNotExist}`)
        .send({ value: data_types[0].value });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should give error if character is less than 3", async () => {
      const refType = await type_reference.create({
        value: data_types[0].value,
      });
      const respond = await request(server)
        .put(`${apiPath}/update/${refType.dataValues.id}`)
        .send({ value: minChar });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/3 characters long/);
    });
    it("should give error if character is less than 3", async () => {
      const refType = await type_reference.create({
        value: data_types[0].value,
      });
      const respond = await request(server)
        .put(`${apiPath}/update/${refType.dataValues.id}`)
        .send({ value: maxChar });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/64 characters long/);
    });
    it("should update with the valid", async () => {
      const refType = await type_reference.create({
        value: data_types[0].value,
      });
      const respond = await request(server)
        .put(`${apiPath}/update/${refType.dataValues.id}`)
        .send({ value: `${data_types[0].value}new` });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty("value", `${data_types[0].value}new`);
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPath}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPath}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const refType = await type_reference.create({
        value: data_types[0].value,
      });
      const respond = await request(server).delete(
        `${apiPath}/delete/${refType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty("value", data_types[0].value);
    });
  });
});
