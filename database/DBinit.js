const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const queryInterface = sequelize.getQueryInterface();
console.log((9*6 + 6*5 + 5*4 + 8*3 + 3*2 + 16)/46)
const tags = require('./database/DBTable.js')(sequelize, Sequelize.DataTypes);
tags.update({ GuessRate: sequelize.literal('(Six*6 + Five*5 + Four*4 + Three*3 + Two*2 + One)/Wins') }, { where: { id: [1, 2, 3, 4] }});
//tags.update({ Played: sequelize.literal('35') }, { where: { id: [1] }});
//tags.update({ Wins: sequelize.literal('32') }, { where: { id: [1] }});

//queryInterface.removeColumn('tags', 'GuessRate', { type: DataTypes.REAL, defaultValue: 0, allowNull: false});
//queryInterface.addColumn('tags', 'GuessRate', { type: DataTypes.REAL, defaultValue: 0, allowNull: false});


const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force })
