const { query_find, query_find_by_id } = require("./query_get.services");
const { query_delete_by_id } = require("./query_delete.services");
const { query_post } = require("./query_post.services");
const { query_put } = require("./query_put.services");
const { idNumber } = require("../middlewares");

const getBasicRoutes = (router, model, schema) => {
  router.post(
    "/new",
    async (req, res) => await query_post(req, res, model, schema)
  );

  router.put(
    "/update/:id",
    [idNumber],
    async (req, res) => await query_put(req, res, model, schema)
  );

  router.get(
    "/find/:id",
    [idNumber],
    async (req, res) => await query_find_by_id(req, res, model)
  );

  router.get("/find", async (req, res) => await query_find(req, res, model));

  router.delete(
    "/delete/:id",
    [idNumber],
    async (req, res) => await query_delete_by_id(req, res, model)
  );
};

module.exports = { getBasicRoutes };
