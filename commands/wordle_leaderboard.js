const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const tags = require('../DBTable.js')(sequelize, Sequelize.DataTypes);
module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'wlb'],
    cooldown: 0,
    description: 'motus/sutom/wordle',
    async run(client, message, args, cmd){
        var image = client.guilds.resolve(message.guild.id).members.resolve(message.author.id).user.displayAvatarURL({size : 2048, dynamic : true})
        if (!args[0]) return message.channel.send('Faut mentionner qlq')
        let user = await tags.findOne({ where: { userid: message.mentions.members.first().user.id }})
        if (!user) return message.channel.send('Cette personne na jamais joué')
        const exampleEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle(`${user.name}`)
	    .setDescription(`**${user.Played}** game **${user.Wins}** victoires, **${user.Loses}** défaites et  en **${user.GuessRate}** coups en moyenne`)
	    .addFields(
	    	{ name: '1 coup', value: `${user.One}`, inline: true },
	    	{ name: '2 coup', value: `${user.Two}`, inline: true },
			{ name: '3 coup', value: `${user.Three}`, inline: true },
            { name: '4 coup', value: `${user.Four}`, inline: true },
            { name: '5 coup', value: `${user.Five}`, inline: true },
            { name: '6 coup', value: `${user.Six}`, inline: true }
	    )
	    .setTimestamp()
	    .setFooter({ text: '\u200B', iconURL: image });
        message.channel.send({ embeds: [exampleEmbed] })
    }
}