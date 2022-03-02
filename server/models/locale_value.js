const { string_type } = require("../utils");
module.exports = (sequelize, DataTypes) => {
  const Locale_Value = sequelize.define("locale_value", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: string_type(DataTypes, 1024, "utf8mb4"),
      allowNull: false,
    },
  });

  Locale_Value.associate = (models) => {
    Locale_Value.belongsTo(models.localization, {
      foreignKey: {
        allowNull: false,
      },
    });
    Locale_Value.belongsTo(models.locale_key, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Locale_Value;
};
/*
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| locale_values | CREATE TABLE `locale_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `localeKeyId` int DEFAULT NULL,
  `localizationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `localeKeyId` (`localeKeyId`),
  KEY `localizationId` (`localizationId`),
  CONSTRAINT `locale_values_ibfk_289` FOREIGN KEY (`localeKeyId`) REFERENCES `locale_keys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `locale_values_ibfk_290` FOREIGN KEY (`localizationId`) REFERENCES `localizations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6727 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
