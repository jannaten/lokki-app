const { query_find, query_find_by_id } = require("./query_get.services");
const { query_delete_by_id } = require("./query_delete.services");
const { query_post } = require("./query_post.services");
const { query_put } = require("./query_put.services");
const {
  query_localization_add_or_edit_put,
} = require("./add_or_edit_localize_value.services");

module.exports = {
  query_localization_add_or_edit_put,
  query_delete_by_id,
  query_find_by_id,
  query_post,
  query_find,
  query_put,
};
