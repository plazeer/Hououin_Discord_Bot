module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tags', {
    	name: {
    		type: DataTypes.STRING,
    		unique: true,
    	},
        userid: {
    		type: DataTypes.STRING,
    		unique: true,
    	},
        Played: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        GuessRate: {
            type: DataTypes.REAL,
    		defaultValue: 0,
    		allowNull: false,
        },
        Wins: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Loses: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        One: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Two: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Three: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Four: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Five: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
        Six: {
            type: DataTypes.INTEGER,
    		defaultValue: 0,
    		allowNull: false,
        },
    });
}