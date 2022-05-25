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
let arr = [];
module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'wlb'],
    cooldown: 0,
    description: 'leaderboard wordle',
    async run(client, message, args, cmd){
        let users = await tags.findAll({ raw: true })
        var image = client.guilds.resolve(message.guild.id).members.resolve(message.author.id).user.displayAvatarURL({size : 2048, dynamic : true})
        if (!args[0]) {
            let start = 0;
            let max = arr.length;
            await leaderboard(users)
            if (arr.length < 10 ) {
                const exampleEmbed = new MessageEmbed()
	                .setColor('#0099ff')
	                .setTitle(`Classement Wordle`)
	                .setDescription(`Classement de tous les utilisateurs qui ont joué à &wordle/&w`)
	                .addFields(arr)
	                .setTimestamp()
	                .setFooter({ text: '\u200B', iconURL: image });
                message.channel.send({ embeds: [exampleEmbed] })
            } else if (arr.length > 10) {
                let classement = await emb.reply({ embeds: [await page_embed(start, max+1, arr, image)], components: [buttons]});
                client.channels.cache.get(message.channel.id).messages.fetch(emb.id).then(message => message.delete());
                const collector2 = classement.createMessageComponentCollector({ time: 60000 });
                collector2.on('collect', async i => {
                    if (i.customId === 'forward') {
                        start +=10;
                        if (start > max+1) start = 0;
                        await i.update({ embeds: [await page_embed(start, max, arr, image)], components: [buttons]});
                    }
                    if (i.customId === 'back') {
                        start -=10;
                        if (start < -10) start = 10;
                        await i.update({ embeds: [await page_embed(start, max, arr, image)], components: [buttons]});
                    }
                })
                return;
            }
        } else {
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
}

const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY'),
)
.addComponents(
    new MessageButton()
        .setCustomId('forward')
        .setLabel('➡')
        .setStyle('SECONDARY'), 
);

async function leaderboard(users) {
    arr = [];
    for await (u of users) {
        let profile = ({
            name: `${u.name}`,
            value: `**${u.Played}** game **${u.Wins}** victoires, **${u.Loses}** défaites et en **${u.GuessRate}** coups en moyenne \n`
        })
        arr.push(profile)
    }
}

async function page_embed (start, end, std, image) {
    if (start === end || start > end ) start = 0;
    if (start < 0) start = end;
    let current = std.slice(start, start+10);
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Classement Wordle`)
        .setDescription(`Classement de tous les utilisateurs qui ont joué à &wordle/&w`)
        .addFields(current)  
        .setTimestamp()
	    .setFooter({ text: '\u200B', iconURL: image });
}