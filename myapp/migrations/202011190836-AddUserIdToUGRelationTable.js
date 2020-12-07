      //users_id: {
      //	type: DataTypes.UUID,
      //  references: {
      //        model: {
      //            tableName: 'Users',
      //            schema: 'smart_remind_schema'
      //        },
      //        key: 'id'
      //  },
      //  allowNull: false
      //},
      //groups_id: {
      //	type: DataTypes.UUID,
      //  references: {
      //        model: {
      //            tableName: 'Groups',
      //            schema: 'smart_remind_schema'
      //        },
      //        key: 'id'
      //  },
      //  allowNull: false
      //}
'use strict'; 

const columnAndTypes = [{ 
	name: 'UserId', 
	type: (Sequelize) => { 
		return { 
			type: Sequelize.UUID, 
			defaultValue: false,
			allowNull: false, 
			foreignKey: 'id'
		} 
	} 
}]; 

// Don't change it 
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all( columnAndTypes.map(c => {
			return queryInterface.addColumn(
				'userGroupRelations',
				c.name,
				c.type(Sequelize)
			) 
		}) 
		); 
	}, 
	down: (queryInterface, Sequelize) => {
		return Promise.all(
			columnAndTypes.map(c => {
				return queryInterface.removeColumn(
					'userGroupRelations',
					c.name,
				)
			}) 
		) 
	} 
};

