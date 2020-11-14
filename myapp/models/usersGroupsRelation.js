/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var userGroupRelation = sequelize.define('userGroupRelation', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      users_id: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Users',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: false
      },
      groups_id: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Groups',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: false
      }
  });
  userGroupRelation.associate = models => {
    userGroupRelation.hasMany(models.Group, {
      onDelete: "cascade"
    });
    userGroupRelation.belongsTo(models.User, {
      onDelete: "cascade"
    });
  }
  return userGroupRelation;
}
