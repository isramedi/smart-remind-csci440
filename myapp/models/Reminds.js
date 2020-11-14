/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Remind = sequelize.define('Remind', {
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
      category: {
        allowNull: true,
        type: DataTypes.STRING
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING
      },
      notes: {
        allowNull: true,
        type: DataTypes.STRING
      },
      dateOfRemind: {
        allowNull: true,
        type: DataTypes.DATE
      },
      type: {
      	allowNull: true,
      	type: DataTypes.STRING
      },
      urgency: {
      	allowNull: true,
      	type: DataTypes.STRING
      },
      expired: {
      	allowNull: true,
      	type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      UserId: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Users',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: true
      },
      GroupId: {
      	type: DataTypes.UUID,
        references: {
              model: {
                  tableName: 'Groups',
                  schema: 'public'
              },
              key: 'id'
        },
        allowNull: true
      }
  });
  Remind.associate = models => {
    Remind.belongsTo(models.User, {
      onDelete: "cascade"
    });
    Remind.belongsTo(models.Group, {
      onDelete: "cascade"
    });
  };

  return Remind;
}
