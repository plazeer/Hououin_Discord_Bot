const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js');
const f1js = require("formula-one-js");
const { results, drivers, standings} = f1js.requests();

module.exports = {
    name: 'driver',
    aliases: ['dr', 'driver', 'd'],
    cooldown: 0,
    description: '',
    async run(client, message, args, cmd){
		var image = client.guilds.resolve(message.guild.id).members.resolve(message.author.id).user.displayAvatarURL({size : 2048, dynamic : true})
		var url;
		var constructeur_nom;
		var constructeur_url;
		var points;
		var position;
		var wins;
		var constructeurid;
		let arg;
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Choisis un pilote...')
					.setMinValues(0)
					.setMaxValues(1)
					.addOptions([x])
			)

		let menu = await message.channel.send({components: [row]})
		const filter1 = i => i.user.id === message.author.id;
		const collector1 = menu.createMessageComponentCollector({filter1, time: 30000 });
		collector1.on('collect', async i => {
			collector1.stop()
			arg = i.values[0];
			client.channels.cache.get(menu.channel.id).messages.fetch(menu.id).then(message => message.delete())
		})
		collector1.on('end', async i => {
		await standings.getCurrentDriverStanding().then(async(standingList) => {
			standingList.forEach(driver => {
				if (driver.Driver.driverId !== arg) return;
				constructeur_url = driver.Constructors[0].url;
				constructeur_nom = driver.Constructors[0].name;
				constructeurid = driver.Constructors[0].constructorId;
				points = driver.points;
				position = driver.position;
				wins = driver.wins;
        	})			
		});

		teams.forEach(team => {
			if (team.team !== constructeurid) return;
			url = team.url
		})

		await drivers.getDriverInformations(arg)
        .then(async(driver) => {
        const exampleEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle(`${driver.givenName} ${driver.familyName}`)
	    .setURL(`${driver.url}`)
	    .setDescription(`${driver.nationality} driver for ${constructeur_nom}`)
	    .setThumbnail(`${url}.png`)
	    .addFields(
	    	{ name: 'Position', value: `${position}`, inline: true },
	    	{ name: 'Points', value: `${points}`, inline: true },
			{ name: 'Wins', value: `${wins}`, inline: true }
	    )
	    .setTimestamp()
	    .setFooter({ text: '\u200B', iconURL: image });
        message.channel.send({ embeds: [exampleEmbed] });       
     })
	});
    }
}

const x = [];
standings.getCurrentDriverStanding().then((standingList) => {
	standingList.forEach(driver => {
		x.push({
			label: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
			description: `${driver.Driver.nationality} driver for ${driver.Constructors[0].name}`,
			value: `${driver.Driver.driverId}`
		});
	});
});

let teams = [
	{
		team: 'williams',
		url: 'https://imgur.com/OK6Afd4'
	},{
		team: 'alfa_romeo',
		url: 'https://imgur.com/rDdzlCF'
	},{
		team: 'alphatauri',
		url: 'https://imgur.com/xecj9Ed'
	},{
		team: 'red_bull',
		url: 'https://imgur.com/eLfwgw5'
	},{
		team: 'mercedes',
		url: 'https://imgur.com/iBtJhE3'
	},{
		team: 'alpine',
		url: 'https://imgur.com/A5Agrdl'
	},{
		team: 'aston_martin',
		url: 'https://imgur.com/Ajs0NHz'
	},{
		team: 'ferrari',
		url: 'https://imgur.com/IoBay2E'
	},{
		team: 'haas',
		url: 'https://imgur.com/8s03OuJ'
	},{
		team: 'mclaren',
		url: 'https://imgur.com/3N2J6AY'
	},
];
