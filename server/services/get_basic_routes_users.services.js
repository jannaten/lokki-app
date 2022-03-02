const { idNumber } = require("../middlewares");
const { query_put_user } = require("./query_put.services");
const { query_find_user } = require("./query_get.services");
const { query_post_user } = require("./query_post.services");
const { query_delete_by_id } = require("./query_delete.services");
const { query_find_by_id_user } = require("./query_get.services");

const getBasicRoutesForUsers = (router, model, schema, refOne, refTwo) => {
  router.post(
    "/new",
    async (req, res) => await query_post_user(req, res, model, schema)
  );

  router.put(
    "/update/:id",
    [idNumber],
    async (req, res) => await query_put_user(req, res, model, schema)
  );

  router.get(
    "/find/:id",
    [idNumber],
    async (req, res) =>
      await query_find_by_id_user(req, res, model, refOne, refTwo)
  );

  router.get(
    "/find",
    async (req, res) => await query_find_user(req, res, model, refOne, refTwo)
  );

  router.delete(
    "/delete/:id",
    [idNumber],
    async (req, res) =>
      await query_delete_by_id(req, res, model, { isUser: true })
  );
};

module.exports = { getBasicRoutesForUsers };
