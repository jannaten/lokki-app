require("dotenv").config();
const db = require("../../models");
const request = require("supertest");
const { randomString } = require("../../utils");
const data_types = require("../../data/type_reference.data.json");

let server;
const { type_reference, blog_audiance } = db;
const apiPathRef = "/api/references/type";
const apiPathBlogAudiance = "/api/blog_audiance";

let selectedBlogAudiance;
describe("/api/blog_audiance", () => {
  beforeEach(async () => {
    server = require("../../server");
    data_types.map(async (el) => {
      await type_reference.create(el);
    });
    const { body } = await request(server).get(`${apiPathRef}/find`);
    selectedBlogAudiance = body.filter(
      ({ value }) =>
        value === data_types[1].value ||
        value === data_types[2].value ||
        value === data_types[3].value ||
        value === data_types[4].value
    );
  });
  afterEach(async () => {
    await type_reference.destroy({
      where: {},
      force: true,
    });
    await blog_audiance.destroy({
      where: {},
      force: true,
    });
    await db.sequelize.query("ALTER TABLE type_references AUTO_INCREMENT = 1");
    await db.sequelize.query("ALTER TABLE blog_audiances AUTO_INCREMENT = 1");
    await server.close();
  });
  describe("GET /find", () => {
    it("should return all blog_audiance", async () => {
      selectedBlogAudiance.map(async ({ id }) => {
        await blog_audiance.create({ typeReferenceId: id });
      });
      const { body: blog_audiance_data, status } = await request(server).get(
        `${apiPathBlogAudiance}/find`
      );
      expect(status).toBe(200);
      selectedBlogAudiance.map(
        async ({ id }) =>
          await expect(
            blog_audiance_data.some(
              async (el) => (await el.typeReferenceId) === id
            )
          ).toBeTruthy()
      );
    });
  });
  describe("GET /find/:id", () => {
    it("should return blog audiance with valid id passed", async () => {
      const blogAudiance = await blog_audiance.create({
        typeReferenceId: selectedBlogAudiance[0].id,
      });
      const respond = await request(server).get(
        `${apiPathBlogAudiance}/find/${blogAudiance.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        blogAudiance.dataValues.typeReferenceId
      );
    });
    it("should return status 400 if id is not a number", async () => {
      const invalidId = randomString(10);
      const respond = await request(server).get(
        `${apiPathBlogAudiance}/find/${invalidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should return status 404 if invalid id is passed", async () => {
      const idNotExist = 1;
      const respond = await request(server).get(
        `${apiPathBlogAudiance}/find/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
  });
  describe("POST /new", () => {
    const string = randomString(2);
    it("should give error if character not a number", async () => {
      const respond = await request(server)
        .post(`${apiPathBlogAudiance}/new`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toMatch(/must be a number/);
    });
    it("should create blog audiance", async () => {
      const respond = await request(server)
        .post(`${apiPathBlogAudiance}/new`)
        .send({ typeReferenceId: selectedBlogAudiance[0].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedBlogAudiance[0].id
      );
    });
  });
  describe("PUT /update/:id", () => {
    const string = randomString(2);
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server)
        .put(`${apiPathBlogAudiance}/update/${inValidId}`)
        .send({ typeReferenceId: string });
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while updating", async () => {
      const idNotExist = 5;
      const respond = await request(server)
        .put(`${apiPathBlogAudiance}/update/${idNotExist}`)
        .send({ typeReferenceId: selectedBlogAudiance[0].id });
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should update with the valid id", async () => {
      const cretedBlogAudiance = await blog_audiance.create({
        typeReferenceId: selectedBlogAudiance[0].id,
      });
      const respond = await request(server)
        .put(
          `${apiPathBlogAudiance}/update/${cretedBlogAudiance.dataValues.id}`
        )
        .send({ typeReferenceId: selectedBlogAudiance[1].id });
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedBlogAudiance[1].id
      );
    });
  });
  describe("DELETE /delete/:id", () => {
    it("should return 400 if the id is not a number", async () => {
      const inValidId = randomString(10);
      const respond = await request(server).delete(
        `${apiPathBlogAudiance}/delete/${inValidId}`
      );
      expect(respond.status).toBe(400);
      expect(respond.body.message).toBe("Please provide a valid id");
    });
    it("should give 404 types not exist while deleting", async () => {
      const idNotExist = 5;
      const respond = await request(server).delete(
        `${apiPathBlogAudiance}/delete/${idNotExist}`
      );
      expect(respond.status).toBe(404);
      expect(respond.body.message).toContain(`${idNotExist}`);
    });
    it("should delete a type if it exist and passed valid id", async () => {
      const cretedBlogAudiance = await blog_audiance.create({
        typeReferenceId: selectedBlogAudiance[0].id,
      });
      const respond = await request(server).delete(
        `${apiPathBlogAudiance}/delete/${cretedBlogAudiance.dataValues.id}`
      );
      expect(respond.status).toBe(200);
      expect(respond.body).toHaveProperty(
        "typeReferenceId",
        selectedBlogAudiance[0].id
      );
    });
  });
});
