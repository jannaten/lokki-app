require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, attachment_type } = db;
const apiPathRef = "/api/references/type";
const apiPathAttachmentType = "/api/attachment/types";

let selectedAttachmentType;
describe("/api/attachment/types", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedAttachmentType = body.filter(
      ({ value }) =>
        value === data_types[1].value ||
        value === data_types[2].value ||
        value === data_types[3].value ||
        value === data_types[8].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await attachment_type.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query("ALTER TABLE attachment_types AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all attachment_type", async () => {
      selectedAttachmentType.map(async ({ id }) => {
        await attachment_type.create({ typeReferenceId: id });
      });
      const { body: attachment_type_data, status } = await request(server).get(
        `${apiPathAttachmentType}/find`
      );
      expect(status).toBe(200);
      selectedAttachmentType.map(
        async ({ id }) =>
          await expect(
            attachment_type_data.some(
              async (el) => (await el.typeReferenceId) === id
            )
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return attachment types with valid id passed", async () => {
      const attachmentType = await attachment_type.create({
        typeReferenceId: selectedAttachmentType[0].id,
      });
      const respond = await request(server).get(
        `${apiPathAttachmentType}/find/${attachmentType.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        attachmentType.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathAttachmentType}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathAttachmentType}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathAttachmentType}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create attachment type", async () => {
      const respond = await request(server)
        .post(`${apiPathAttachmentType}/new`)
        .send({ typeReferenceId: selectedAttachmentType[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedAttachmentType[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathAttachmentType}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathAttachmentType}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedAttachmentType[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const createdAttachmentTypes = await attachment_type.create({
        typeReferenceId: selectedAttachmentType[0].id,
      });
      const respond = await request(server)
        .put(
          `${apiPathAttachmentType}/update/${createdAttachmentTypes.dataValues.id}`
        )
        .send({ typeReferenceId: selectedAttachmentType[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedAttachmentType[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathAttachmentType}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathAttachmentType}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const createdAttachmentTypes = await attachment_type.create({
        typeReferenceId: selectedAttachmentType[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathAttachmentType}/delete/${createdAttachmentTypes.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedAttachmentType[0].id
      );
    });
  });
});
