const { string_type } = require("../utils");
module.exports = (sequelize, DataTypes) => {
  const Localization = sequelize.define("localization", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    locale: {
      type: string_type(DataTypes, 32, "utf8mb4"),
      allowNull: false,
    },
    name: {
      type: string_type(DataTypes, 64, "utf8mb4"),
      allowNull: false,
    },
  });

  Localization.associate = (models) => {
    Localization.hasMany(models.locale_value, { onDelete: "cascade" });
    Localization.belongsTo(models.organization, {
      foreignKey: {
        allowNull: false,
      },
    });
    Localization.belongsTo(models.product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Localization;
};
/*
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| localizations | CREATE TABLE `localizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `locale` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int DEFAULT NULL,
  `organizationId` int DEFAULT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `organizationId` (`organizationId`),
  CONSTRAINT `localizations_ibfk_285` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `localizations_ibfk_286` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
