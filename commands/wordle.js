const Discord = require("discord.js");
const cooldown = new Discord.Collection();
const humanizeduration = require("humanize-duration")
const csv = require('csv-parser')
const fs = require('fs')

let result = [];
let picked;
var night = new Date();
var now = new Date();
var cd = night - now
night.setHours(24,0,0,0); 

fs.createReadStream('wordle.csv')
  .pipe(csv())
  .on('data', (data) => result.push(data.Word))
  .on('end', () => {
    picked = result[Math.floor(Math.random() * result.length)]
  });
setTimeout(() => picked = result[Math.floor(Math.random() * result.length)], cd);
module.exports = {
    name: 'wordle',
    aliases: ['word', 'w', 'sutom', 'motus'],
    cooldown: 0,
    description: 'motus/sutom/wordle',
    async run(client, message, args, cmd){
        var midnight = new Date();
        midnight.setHours(24,0,0,0); 
        var now = new Date();
        var msToMidnight = midnight - now
        const cd = cooldown.get(message.author.id)
        if (cd) {
            let remaining = humanizeduration(midnight - now, { round: true, delimiter: " et ", language: "fr"   });
            return message.channel.send(`${remaining} avant de pouvoir rejouer`)
        }
        let mot = picked.split(/(?!$)/u)
        let mot_masque = picked.split(/(?!$)/u);
        let mot2 = picked.split(/(?!$)/u);
        let x = 1;
        let a = 0;
        let total = [];
        mot.forEach(async i => {
            if(mot_masque.indexOf(i) !== -1) {
                mot_masque.splice(x, 1, '...')
                x++;
            }
        });
        cooldown.set(message.author.id, parseInt(Date.now(), 10) + msToMidnight);
        setTimeout(() => cooldown.delete(message.author.id), msToMidnight);
        await message.author.send(`${mot_masque.join(' ')} (${mot.length} lettres)`)
        await message.author.send('Répond ici pour donner tes choix, tu as 6 essais.')
        const filter = msg => {return !msg.author.bot && !msg.content.includes('&')};
        message.author.createDM()
        .then(dmchannel => {
        const collector = dmchannel.createMessageCollector({filter, time: 600000 });
            collector.on('collect', async msg => {
                if (!msg.author.id) return;
                if (msg.content.split('').length !== mot.length) return dmchannel.send(`${mot.length} lettres`)
                temp = await msg.content.toLowerCase().split('')
                temp2 = await msg.content.toLowerCase().split('')
                let x = -1;
                for (let i = 0; i < mot.length; i++) {
                    if (temp[i] === mot[i]) {
                        temp2.splice(i, 1, '🟥');
                        temp.splice(i, 1, null);
                        mot2.splice(i, 1, '...');
                    }
                }
                temp.forEach(i => {
                    x++
                    if(mot.indexOf(i) !== -1) {
                        if (temp[x] === mot[x]) return;
                        if (mot2.indexOf(i) === -1) return;
                        temp2.splice(x, 1, '🟨');
                    }
                })
                total.push(temp2.join(' '))
                dmchannel.send(temp2.join(' '));
                if (msg.content === mot.join('')) collector.stop();
                if (a === 6) collector.stop();
                a++
            });
            collector.on('end', async collected => {
                dmchannel.send('gg cétait '+picked)
                dmchannel.send(`${total.join('\n')}`)
            })
        })
    }
}