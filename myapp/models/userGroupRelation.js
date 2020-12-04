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
      user_id: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Users',
                  schema: 'smart_remind_schema'
              },
              key: 'id'
        },
        allowNull: false
      },
      group_id: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Groups',
                  schema: 'smart_remind_schema'
              },
              key: 'id'
        },
        allowNull: true
      }
  });
  //userGroupRelation.associate = models => {
  //  userGroupRelation.hasMany(models.Group, {
  //    onDelete: "cascade"
  //  });
  //  userGroupRelation.belongsTo(models.User, {
  //    onDelete: "cascade"
  //  });
  //}
  return userGroupRelation;
}
