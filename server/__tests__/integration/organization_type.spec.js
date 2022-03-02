require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, organization_type } = db;
const apiPathRef = "/api/references/type";
const apiPathOrganizationType = "/api/organization_types";

let selectedOrganizationTypes;
describe("/api/organization_types", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedOrganizationTypes = body.filter(
      ({ value }) =>
        value === data_types[6].value || value === data_types[7].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await organization_type.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query(
      "ALTER TABLE organization_types AUTO_INCREMENT = 1"
    );
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all organization types", async () => {
      selectedOrganizationTypes.map(async ({ id }) => {
        await organization_type.create({ typeReferenceId: id });
      });
      const { body: organization_type_data, status } = await request(
        server
      ).get(`${apiPathOrganizationType}/find`);
      expect(status).toBe(200);
      selectedOrganizationTypes.map(
        async ({ id }) =>
          await expect(
            organization_type_data.some(
              async (el) => (await el.typeReferenceId) === id
            )
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return organization types with valid id passed", async () => {
      const organizationType = await organization_type.create({
        typeReferenceId: selectedOrganizationTypes[0].id,
      });
      const respond = await request(server).get(
        `${apiPathOrganizationType}/find/${organizationType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        organizationType.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathOrganizationType}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathOrganizationType}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathOrganizationType}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create organization types", async () => {
      const respond = await request(server)
        .post(`${apiPathOrganizationType}/new`)
        .send({ typeReferenceId: selectedOrganizationTypes[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedOrganizationTypes[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathOrganizationType}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathOrganizationType}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedOrganizationTypes[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const cretedOrganizationType = await organization_type.create({
        typeReferenceId: selectedOrganizationTypes[0].id,
      });
      const respond = await request(server)
        .put(
          `${apiPathOrganizationType}/update/${cretedOrganizationType.dataValues.id}`
        )
        .send({ typeReferenceId: selectedOrganizationTypes[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedOrganizationTypes[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathOrganizationType}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathOrganizationType}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const cretedOrganizationType = await organization_type.create({
        typeReferenceId: selectedOrganizationTypes[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathOrganizationType}/delete/${cretedOrganizationType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedOrganizationTypes[0].id
      );
    });
  });
});
