/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
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
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      creator_id: {
        allowNull: true,
        type: DataTypes.UUID
      },
      //UserId: {
      //	type: DataTypes.UUID,
      //  references: {
      //        model: {
      //            tableName: 'Users',
      //            schema: 'smart_remind_schema'
      //        },
      //        key: 'id'
      //  },
      //  allowNull: false
      //}
  });
  Group.associate = models => {
    Group.hasMany(models.Remind, {
      onDelete: "cascade"
    });
    Group.belongsTo(models.userGroupRelation, {
      onDelete: "cascade"
    });
  };
  return Group;
}
