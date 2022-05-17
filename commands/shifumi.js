const { MessageActionRow, MessageButton} = require('discord.js');
const { move_channel, mute, disco, mute_vc, change_nick} = require('../functions/punition_shifumi.js');
module.exports = {
    name: 'button',
    aliases: [],
    cooldown: 0,
    description: '',
    async run(client, message, args, cmd){
        if (!message.mentions.members.first()) return message.channel.send("Mentionne quelqu'un")
        const guild = client.guilds.cache.get(message.guild.id)
        guild.members.fetch().then((members) => {});     
        let choix = 0;
        let j2 = await message.mentions.members.first().id;
        let j1 = await message.author.id;
        let participants = [];
        let joueur = [];
        function shifumi(pierre, feuille, ciseaux) {
            this.pierre = pierre;
            this.feuille = feuille;
            this.ciseaux = ciseaux;
          }
        punish = await message.channel.send({ content: 'Gage, celui qui a lancé le shifumi choisi.', components: [gage] });
        const filter1 = i => i.user.id === j1;
        const collector1 = punish.createMessageComponentCollector({ filter1, time: 30000 });
        collector1.on('collect', async i => {
            if(joueur.indexOf(i.user.id) !== -1) return i.reply("Tu as deja fais ton choix");
            if (joueur.length > 2) return i.reply("Il ya déja deux participants");
            joueur.push(i.user.id);
            if (i.customId === 'move') {
                i.reply("<@"+i.user.id+"> le move de channel")
                choix = 1;
            }
            if (i.customId === 'mute') {
                i.reply("<@"+i.user.id+"> choisi le mute écrit")
                choix = 2;

            }
            if (i.customId === 'mute_vc') {
                i.reply("<@"+i.user.id+"> choisi le mute vocal")
                choix = 3;

            }
            if (i.customId === 'disco') {
                i.reply("<@"+i.user.id+"> choisi la déconnexion")
                choix = 4;

            }
            if (i.customId === 'change_nick') {
                i.reply("<@"+i.user.id+"> choisi le changement de pseudo")
                choix = 5;

            }
            if (joueur.length === 1) return collector1.stop();
        });
        reply = await message.reply({ content: 'shifumi', components: [row] });
        const collector2 = reply.createMessageComponentCollector({ time: 30000 });
        collector2.on('collect', async i => {
            if (i.user.id !== j2 && i.user.id !== j1) return;
            if(participants.indexOf(i.user.id) !== -1) return i.reply("Tu as deja fais ton choix");
            if (participants.length > 2) return i.reply("Il ya déja deux participants");
            participants.push(i.user.id);
            if (i.customId === 'pierre') {
                shifumi.pierre = i.user.id;
                i.reply("<@"+i.user.id+"> a fait son choix")
            }
            if (i.customId === 'feuille') {
                shifumi.feuille = i.user.id;
                i.reply("<@"+i.user.id+"> a fait son choix")
            }
            if (i.customId === 'ciseaux') {
                shifumi.ciseaux = i.user.id;
                i.reply("<@"+i.user.id+"> a fait son choix")
            }
            if (participants.length === 2) return collector2.stop();
        });
        collector2.on('end', async i => {
            console.log(shifumi)
            load(message, client);
            setTimeout(() => {
            if (participants.length < 2) return reply.reply("T'étais le seul à jouer malheureusement")
            if (shifumi.pierre){
                if (!shifumi.ciseaux && !shifumi.feuille) {
                    reply.reply("égalité 🪨 ")
                    return;
                }
                if (shifumi.ciseaux) {
                    var gagnant = shifumi.pierre
                    var perdant = shifumi.ciseaux
                    reply.reply("<@"+gagnant+"> 🪨 gagne contre ✂️ <@"+perdant+">")
                } else if (shifumi.feuille) {
                    var gagnant = shifumi.feuille
                    var perdant = shifumi.pierre
                    reply.reply("<@"+gagnant+"> 🍃 gagne contre 🪨 <@"+perdant+">")
                }
            }
            else if (shifumi.feuille) {
                if (!shifumi.ciseaux && !shifumi.pierre) {
                    reply.reply("égalité 🍃")
                    return;
                }
                if (shifumi.ciseaux) {
                    var gagnant = shifumi.ciseaux
                    var perdant = shifumi.feuille
                    reply.reply("<@"+gagnant+"> ✂️ gagne contre 🍃 <@"+perdant+">")
                } else if (shifumi.pierre) {
                    var gagnant = shifumi.feuille
                    var perdant = shifumi.pierre
                    reply.reply("<@"+gagnant+"> 🍃 gagne contre 🪨 <@"+perdant+">")
                }
            }
            else if (shifumi.ciseaux) {
                if (!shifumi.feuille && !shifumi.pierre) {
                    reply.reply("égalité ✂️")
                    return;
                }
                if (shifumi.feuille) {
                    var gagnant = shifumi.ciseaux
                    var perdant = shifumi.feuille
                    reply.reply("<@"+gagnant+"> ✂️ gagne contre 🍃 <@"+perdant+">")
                } else if (shifumi.pierre) {
                    var gagnant = shifumi.pierre
                    var perdant = shifumi.ciseaux
                    reply.reply("<@"+gagnant+"> 🪨 gagne contre ✂️ <@"+perdant+">")
                };
            };
            console.log(choix)
            loser = message.guild.members.cache.get(perdant);
            winner = message.guild.members.cache.get(gagnant);
            if (choix === 5) change_nick(message, winner, loser, client);
            else if (choix === 4) disco(winner);
            else if (choix === 3) mute_vc(message, loser);
            else if (choix === 1) move_channel(message, loser);
            else if (choix === 2) mute(message, loser);
        }, 4000);
    });
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function load (message, client) {
    for (var i = 0; i <= 3  ; i++) {
        if (i === 1) {
        var msg = await message.channel.send("Shi...")
        }
        else if (i === 2) { 
            msg.edit("Shi...fu...")
        }
        if (i === 3) {
            msg.edit("Shi...fu...mi!")
        }
        await timer(1000);
      }
}

const row = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('pierre')
        .setLabel('Pierre')
        .setStyle('SECONDARY'), 
)
.addComponents(
    new MessageButton()
        .setCustomId('feuille')
        .setLabel('Feuille')
        .setStyle('SUCCESS'),
)
.addComponents(
    new MessageButton()
        .setCustomId('ciseaux')
        .setLabel('Ciseaux')
        .setStyle('PRIMARY'),
);

const gage = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('move')
            .setLabel('Move channel')
            .setStyle('SECONDARY'), 
    )
    .addComponents(
        new MessageButton()
            .setCustomId('disco')
            .setLabel('Déconnexion')
            .setStyle('SUCCESS'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('mute')
            .setLabel('Mute écrit')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('mute_vc')
            .setLabel('Mute vocal')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('change_nick')
            .setLabel('Changer de Pseudo')
            .setStyle('DANGER'),
    )