const { query_put } = require("./query_put.services");
const { query_post } = require("./query_post.services");
const { getBasicRoutes } = require("./get_basic_routes.services");
const { query_delete_by_id } = require("./query_delete.services");
const { query_find, query_find_by_id } = require("./query_get.services");
const { getBasicRoutesForUsers } = require("./get_basic_routes_users.services");
const { indexProvider, casCadeProvider } = require("./model_provider.services");

module.exports = {
  getBasicRoutesForUsers,
  query_delete_by_id,
  query_find_by_id,
  casCadeProvider,
  getBasicRoutes,
  indexProvider,
  query_find,
  query_post,
  query_put,
};
