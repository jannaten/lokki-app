function indexProvider(columns, unique = true) {
  return {
    indexes: [
      {
        unique,
        fields: columns,
      },
    ],
  };
}

function casCadeProvider(
  paranoid = { value: true },
  onUpdate = { value: "CASCADE" },
  onDelete = { value: "CASCADE" }
) {
  return {
    paranoid: paranoid.value,
    onDelete: onDelete.value,
    onUpdate: onUpdate.value,
  };
}

module.exports = { indexProvider, casCadeProvider };
