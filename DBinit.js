const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const queryInterface = sequelize.getQueryInterface();

require('./DBTable.js')(sequelize, Sequelize.DataTypes);
//queryInterface.removeColumn('tags', 'Played', { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false});
queryInterface.addColumn('tags', 'Played', { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false});


const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force })
