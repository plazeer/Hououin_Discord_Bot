const { MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
    name: 'Pour combien',
    aliases: ['pc', 'pourcombien'],
    cooldown: 0,
    description: 'pour combien',
    async run(client, message, args, cmd){
        if (!message.mentions.members.first()) return console.log("pas de mention")
        let v1;
        let v2;
        let done = 0;
        const filter = msg => {return !msg.author.bot && !msg.content.includes('&')};
        message.author.send(`Repond ton chiffre pour le pour combien ici`)
        await message.author.createDM()
        .then(dmchannel => {
        const collector = dmchannel.createMessageCollector({filter, time: 60000 });
            collector.on('collect', async msg => {
                v1 = msg.content;
                done +=1;
                console.log(done)
                collector.stop();
            })
        })
        message.mentions.members.first().send(`Repond ton chiffre pour le pour combien ici`)
        await message.mentions.members.first().createDM()
        .then(dmchannel => {
            const collector = dmchannel.createMessageCollector({filter, time: 60000 });
                collector.on('collect', async msg => {
                    v2 = msg.content;
                    done +=1;
                    console.log(done)
                    collector.stop();
                })
            })
        
    }
}