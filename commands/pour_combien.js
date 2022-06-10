const { MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
    name: 'Pour combien',
    aliases: ['pc', 'pourcombien'],
    cooldown: 0,
    description: 'pour combien',
    async run(client, message, args, cmd){
        if (!message.mentions.members.first()) return console.log("pas de mention")
        const filter = msg => {return !msg.author.bot && !msg.content.includes('&')};
        let v1;
        let v2;
        let combien;
        message.channel.send(`En combien ? `)
        await message.channel.awaitMessages({ filter, max: 10, time: 60000, errors: ['time'] })
            .then(collected => {
                if(collected.first().author.id !== message.author.id) return;
                if(collected.first().content > 10) return message.channel.send("Choisi un chiffre entre 2 et 10")
				combien = collected.first().content;
                max = 10;
            })
        
        message.author.send(`Repond ton chiffre pour le pour combien ici`)
        await message.author.createDM()
        .then(async dmchannel => {
            await dmchannel.awaitMessages({ filter, max: 10, time: 60000, errors: ['time'] })
            .then(collected => {
                if(collected.first().content > combien) return dmchannel.send("Choisi un chiffre entre 2 et "+combien)
				v1 = collected.first().content;
                max = 10;
            })
        })

        message.mentions.members.first().send(`Repond ton chiffre pour le pour combien ici`)
        await message.mentions.members.first().createDM()
        .then(async dmchannel => {
            await dmchannel.awaitMessages({ filter, max: 10, time: 60000, errors: ['time'] })
            .then(collected => {
                if(collected.first().content > combien) return dmchannel.send("Choisi un chiffre entre 2 et "+combien)
				v2 = collected.first().content;
                max = 10;
            })
        })
        message.channel.send(`<@${message.author.id}>: ${v1} \n${message.mentions.members.first()}: ${v2}`)
        if (v1 === v2) {
            message.channel.send(`<@${message.author.id}> gagne le pour combien !`)
        }
        if (v1 !== v2) {
            message.channel.send(`${message.mentions.members.first()} evite le gage !`)
        }
    }
}