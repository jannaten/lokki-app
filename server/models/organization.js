const { string_type } = require("../utils");
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    "organization",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: string_type(DataTypes, 255, "utf8mb4"),
        allowNull: false,
      },
      apiKey: {
        type: string_type(DataTypes, 255, "utf8mb4"),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name", "apiKey"],
        },
      ],
    }
  );

  Organization.associate = (models) => {
    Organization.hasMany(models.localization, { onDelete: "cascade" });
    Organization.hasMany(models.organization_product, { onDelete: "cascade" });
  };
  return Organization;
};
/*
+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| organizations | CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apiKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organizations_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
