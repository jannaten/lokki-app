function string_type(DataTypes, length, type) {
  return (
    DataTypes.STRING(length) + ` CHARSET ${type} COLLATE ${type}_unicode_ci`
  );
}

module.exports = { string_type };
