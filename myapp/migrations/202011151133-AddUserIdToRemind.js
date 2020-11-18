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
				'Reminds',
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
					'Reminds',
					c.name,
				)
			}) 
		) 
	} 
};

