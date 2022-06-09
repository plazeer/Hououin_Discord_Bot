const { MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
    name: 'Pile ou face',
    aliases: ['pf', 'pileouface'],
    cooldown: 0,
    description: 'pile ou face',
    async run(client, message, args, cmd){
        let reason = args.slice(1).join(" ");
        if (args[0] === 'pile' || args[0] === 'face') {
            let pf = await message.channel.send({
                files: [`./image/pile_ou_face.png`]
            });
            random = Math.floor(Math.random() * 2);
            if (random === 0) {
                timer(5000);
                pf.edit({
                    files: [`./image/pile.png`]
                });
                setTimeout(() =>{ 
                    if (args[0] === 'pile') {
                        pf.reply("<@"+message.author.id+"> bien joué")
                    } else pf.reply("<@"+message.author.id+"> nul")
                }, 750)
            } else if (random === 1) {
                timer(5000);
                pf.edit({
                    files: ([`./image/face.png`])
                });
                setTimeout(() =>{ 
                    if (args[0] === 'face') {
                        pf.reply("<@"+message.author.id+"> bien joué")
                    } else pf.reply("<@"+message.author.id+"> nul")    
                },  750)
            }
        } else {
            let msg = await message.channel.send({ content: "Pile ou face !", components: [row] });
            const filter1 = i => i.user.id === message.author.id;
            const collector1 = msg.createMessageComponentCollector({ filter1, time: 30000 });
            collector1.on('collect', async i => {
                if (i.customId === 'pile') {
                    if (!args[0]) i.reply("<@"+i.user.id+"> choisi pile")
                    i.reply("<@"+i.user.id+"> choisi pile\n pile "+reason)
                    choix = 0;
                }
                if (i.customId === 'face') {
                    if (!args[0]) i.reply("<@"+i.user.id+"> choisi face")
                    i.reply("<@"+i.user.id+"> choisi face\n face "+reason)
                    choix = 1;

               }
                collector1.stop();
            })
            collector1.on('end', async i => {      
                let pf = await message.channel.send({
                    files: [`./image/pile_ou_face.png`]
                });
                random = Math.floor(Math.random() * 2);
                if (random === 0) {
                    timer(10000);
                    pf.edit({
                        files: [`./image/pile.png`]
                    });
                    setTimeout(() =>{ 
                        if (random === choix) {
                            pf.reply("<@"+message.author.id+"> bien joué")
                        } else pf.reply("<@"+message.author.id+"> nul")
                    }, 750)
                } else if (random === 1) {
                   timer(10000);
                    pf.edit({
                        files: ([`./image/face.png`])
                    });
                    setTimeout(() =>{ 
                        if (random === choix) {
                            pf.reply("<@"+message.author.id+"> bien joué")
                        } else pf.reply("<@"+message.author.id+"> nul")    
                    }, 750)
                }
            })
        }
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))

const row = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('pile')
        .setLabel('pile')
        .setStyle('DANGER'), 
)
.addComponents(
    new MessageButton()
        .setCustomId('face')
        .setLabel('face')
        .setStyle('SUCCESS'),
)