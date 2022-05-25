const Discord = require("discord.js");
const cooldown = new Discord.Collection();
const humanizeduration = require("humanize-duration")
const csv = require('csv-parser')
const fs = require('fs')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const tags = require('./database/DBTable.js')(sequelize, Sequelize.DataTypes);
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
        const db = await tags.findOne({ where: { userid: message.author.id } });
        if (!db) {
                await tags.create({
                name: message.author.tag,
                userid: message.author.id,
            })
        }   
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
        let x = 1;
        let a = 0;
        let total = [];
        let arr_bon = [];
        let arr_mauvais = [];
        let win = 0;
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
        const collector = dmchannel.createMessageCollector({filter, time: 1800000 });
            collector.on('collect', async msg => {
                console.log(a)
                if (result.indexOf(msg.content) === -1) return dmchannel.send("Ce mot n'existe pas dans notre dictionnaire")
                if (!msg.author.id) return;
                if (msg.content.split('').length !== mot.length) return dmchannel.send(`${mot.length} lettres`)
                let temp = await msg.content.toLowerCase().split('')
                let temp2 = await msg.content.toLowerCase().split('')
                let mot_temp = picked.split(/(?!$)/u);
                let x = -1;
                let y = -1;
                let lettre = [];
                let faux;
                let rouge;
                let jaune;
                for (let i = 0; i < mot.length; i++) {
                    if (temp[i] === mot[i]) {
                        rouge = temp2.splice(i, 1, '🟥');
                        if(lettre.indexOf(`${rouge}: 🟥`) === -1) {
                            lettre.push(`${rouge}: 🟥`)
                        }
                        arr_bon.push(rouge.join(' '));
                        mot_temp.splice(i, 1, null);
                        temp.splice(i, 1, null);
                    }
                }
                temp.forEach(i => {
                    let count_mot_temp = mot_temp.filter(x => x==i).length;
                    let count_temp = temp.filter(x => x==i).length;
                    x++
                    if (i === mot[x]) return;
                    if(mot.indexOf(i) !== -1) {
                        if (count_mot_temp < count_temp) return temp.splice(x, 1, null);
                        if (i === null) return;
                        jaune = temp2.splice(x, 1, '🟨');
                        if(lettre.indexOf(`${jaune}: 🟨`) === -1) {
                            lettre.push(`${jaune}: 🟨`)
                        }
                        console.log("log")
                        arr_bon.push(jaune.join(' '));
                        mot_temp.splice(x, 1, null);
                    }
                })
                temp2.forEach(i => {
                    y++
                    if(i === '🟨')return;
                    if(i === '🟥')return;
                    faux = temp2.splice(y, 1, '⬛')
                    if (arr_bon.indexOf(faux.join(' ')) !== -1) return;
                    if (arr_mauvais.indexOf(faux.join(' ')) === -1) {
                        arr_mauvais.push(faux.join(' '))
                    }

                })
                    dmchannel.send(temp2.join(' '));
                    dmchannel.send(`Lettres trouvées : ${lettre.join(' ')}`)
                    dmchannel.send(`Mauvaise lettre : ${arr_mauvais.join(' | ')}`)
                    total.push(temp2.join(''))
                if (msg.content === mot.join('')) {
                    win = 1;
                    a++;
                    collector.stop();
                    return;
                }
                if (a === 6) {
                    collector.stop();
                    return;
                }
                a++;
            });
            collector.on('end', async collected => {
                dmchannel.send('gg cétait '+picked)
                dmchannel.send(`Wordle HououinGO4T : \n${total.join('\n')} \n de : <@${dmchannel.recipient.id}>`)
                if (!tags) return;
                await tags.update({ Played: sequelize.literal('Wins + Loses + 1') }, { where: { userid: dmchannel.recipient.id }});
                if (win === 1) {
                    await tags.update({ Wins: sequelize.literal('Wins + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (win === 0) {
                    await tags.update({ Loses: sequelize.literal('Loses + 1') }, { where: { userid: dmchannel.recipient.id }});
                }
                if (a === 1) {
                    await tags.update({ One: sequelize.literal('One + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (a === 2) {
                    await tags.update({ Two: sequelize.literal('Two + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (a === 3) {
                    await tags.update({ Three: sequelize.literal('Three + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (a === 4) {
                    await tags.update({ Four: sequelize.literal('Four + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (a === 5) {
                    await tags.update({ Five: sequelize.literal('Five + 1') }, { where: { userid: dmchannel.recipient.id }});
                } else if (a === 6) {
                    await tags.update({ Six: sequelize.literal('Six + 1') }, { where: { userid: dmchannel.recipient.id }});
                }
                await tags.update({ GuessRate: sequelize.literal('(Six*6 + Five*5 + Four*4 + Three*3 + Two*2 + One)/Wins') }, { where: { userid: dmchannel.recipient.id }});
                
                console.log(await tags.findAll({ raw: true }))     
            })
        })
    }
}