const { string_type } = require("../utils");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
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
      image: {
        type: string_type(DataTypes, 255, "utf8mb4"),
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.localization, { onDelete: "cascade" });
    Product.hasMany(models.locale_key, { onDelete: "cascade" });
    Product.hasMany(models.organization_product, { onDelete: "cascade" });
  };
  return Product;
};
/*
+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| products | CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
