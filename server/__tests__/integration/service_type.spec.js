require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, service_type } = db;
const apiPathRef = "/api/references/type";
const apiPathServiceType = "/api/service/types";

let selectedServiceTypes;
describe("/api/service/type", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedServiceTypes = body.filter(
      ({ value }) =>
        value === data_types[9].value || value === data_types[10].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await service_type.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query("ALTER TABLE service_types AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all service types", async () => {
      selectedServiceTypes.map(async ({ id }) => {
        await service_type.create({ typeReferenceId: id });
      });
      const { body: service_type_data, status } = await request(server).get(
        `${apiPathServiceType}/find`
      );
      expect(status).toBe(200);
      selectedServiceTypes.map(
        async ({ id }) =>
          await expect(
            service_type_data.some(
              async (el) => (await el.typeReferenceId) === id
            )
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return service types with valid id passed", async () => {
      const serviceType = await service_type.create({
        typeReferenceId: selectedServiceTypes[0].id,
      });
      const respond = await request(server).get(
        `${apiPathServiceType}/find/${serviceType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        serviceType.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathServiceType}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathServiceType}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathServiceType}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create service types", async () => {
      const respond = await request(server)
        .post(`${apiPathServiceType}/new`)
        .send({ typeReferenceId: selectedServiceTypes[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedServiceTypes[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathServiceType}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathServiceType}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedServiceTypes[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const cretedServiceType = await service_type.create({
        typeReferenceId: selectedServiceTypes[0].id,
      });
      const respond = await request(server)
        .put(`${apiPathServiceType}/update/${cretedServiceType.dataValues.id}`)
        .send({ typeReferenceId: selectedServiceTypes[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedServiceTypes[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathServiceType}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathServiceType}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const cretedServiceType = await service_type.create({
        typeReferenceId: selectedServiceTypes[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathServiceType}/delete/${cretedServiceType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedServiceTypes[0].id
      );
    });
  });
});
