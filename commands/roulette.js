const ms = require("ms");
const cooldown = new Set();
module.exports = {
    name: 'roulette',
    aliases: ['gacha', 'g'],
    cooldown: 0,
    description: 'Advanced music bot',
    async run(client, message, args, cmd){
        var x = 0;
        const { MessageEmbed } = require('discord.js');
        const guild = client.guilds.cache.get('584833650193858814') // id du serveur
        guild.members.fetch().then((members) => {}); //refresh le cache
        let list = []; //liste 
        if (cooldown.has(x)) return;
        else try {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle("CLIQUEZ")
            sentmsg = await message.channel.send(embed);
            cooldown.add(x);
            setTimeout(() => {
                cooldown.delete(x);
            }, 60000)
            await sentmsg.react('👍')
            const filter = (reaction, user) => {return reaction.emoji.name === '👍' && !user.bot};
            const collector = sentmsg.createReactionCollector(filter, { time: 30000 });
            collector.on ('collect', (reaction, user) => {
                guild.members.fetch(user).then((members) => {
                    if(list.indexOf(members) !== -1) return;
                    list.push(members);
                    const embed = new MessageEmbed()
                    .setColor('#FFD700')
                    .setTitle("GACHA")
                    .setDescription(list);
                    sentmsg.edit(embed);
                });
            });
            collector.on('end', collected => {
                load(message, client);
                setTimeout( async function() {
                    max = list.length;
                    random = Math.floor(Math.random() * max);
                    let picked = list.slice(random,random+1);
                    gacha = Math.floor(Math.random() *100);
                    msg = await message.channel.send("Et le grand gagnant du super gacha organisé par Hououin™️©️ est... ")
                    timer(10000);
                    if (!picked[0].voice.channel) {
                        if (gacha >= 0 && gacha <= 4) kick(message, picked[0], msg);
                        else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg);
                        else if (gacha >= 15 && gacha <= 99) mute(message, picked[0], msg);
                    } else {
                        if (gacha >= 0 && gacha <= 4) kick(message, picked[0], msg);
                        else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg);
                        else if (gacha >= 15 && gacha <= 45 ) disco(message, picked[0], msg);
                        else if (gacha >= 46 && gacha <= 75 ) mute_vc(message, picked[0], msg);
                        else if (gacha >= 76 && gacha <= 100 ) move_channel(message, picked[0], msg);
                    }
                }, 20000);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const move_channel = (message, user, msg) => {
    const id = message.channel.id;
    user.voice.setChannel(id);
    msg.edit("Et le grand gagnant du super gacha organisé par Hououin™️©️ est <@"+user+">!!! BRAVO mon reuf mtn va la bas");
};

const mute = (message, user, msg) => {
    let role = message.guild.roles.cache.find(r => r.name === 'muted');
    var rnd = Math.floor(Math.random() * 5);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    user.roles.add(role);
    msg.edit("Et le grand gagnant du super gacha organisé par Hououin™️©️ est <@"+user+">!!! BRAVO pour le mute de "+ ms(duration)+"in mdrrrrrrrr ")
    setTimeout(function() {
        user.roles.remove(role);
        }, duration);
};

const kick = (message, user, msg) => {
    if(!user.kickable) return;
    user.kick();
    msg.edit("Et le grand gagnant du super gacha organisé par Hououin™️©️ est <@"+user+">!!! AHHAHAH AU REVOIR")
}

const disco = (message, user, msg) => {
    user.voice.kick()
    msg.edit(`Et le grand gagnant du super gacha organisé par Hououin™️©️ est <@`+user+`>!!! BRAVO maintenant DEHHOOOOORS`)
};

const mute_vc = (message, user, msg) => {
    rnd = Math.floor(Math.random() * 5);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    rnd2 = Math.floor(Math.random() * 3);
    if (rnd2 === 0) {
    user.voice
    .setDeaf(true)
    .then((member) => msg.edit(`Et le grand gagnant du super gacha organisé par Hououin™️©️ est ${member}!! haha bravo t'es mute pendant `+ms(duration)+"in"))
    .catch(console.error);
    setTimeout(function() {
        user.voice
        .setDeaf(false);
        }, duration)
    }
    else if ( rnd2 === 1) {
        user.voice
    .setDeaf(true);
        user.voice
    .setMute(true)
    .then((member) => msg.edit(`Et le grand gagnant du super gacha organisé par Hououin™️©️ est ${member}!! haha bravo t'es mute pendant `+ms(duration)+"in"))
    .catch(console.error);
    setTimeout(function() {
        user.voice
        .setDeaf(false);
        user.voice
        .setMute(false);
        }, duration)
    } else if ( rnd2 === 2) {
        user.voice
    .setMute(true)
    .then((member) => msg.edit(`Et le grand gagnant du super gacha organisé par Hououin™️©️ est ${member}!!! Maintenant parle dans les `+rnd+` prochaines minutes sinon t'es raciste ${member}`))
    .catch(console.error);
    setTimeout(function() {
        user.voice
        .setMute(false);
        }, duration)    
    }
};

const droit = (message, user, msg) => {
    let role = message.guild.roles.cache.find(r => r.name === 'DROIT');
    rnd = Math.floor(Math.random() * 10);
    duration = rnd * 5000;
    user.roles.add(role);
    msg.edit("Et le grand gagnant du super gacha organisé par Hououin™️©️ est <@"+user+">!!! FUYEZ IL A DES DROITS PENDANT "+ ms(duration))
    setTimeout(function() {
        user.roles.remove(role);
        }, duration);
};

const timer = ms => new Promise(res => setTimeout(res, ms))

async function load (message, client) {
    const msg = await message.channel.send("TIC...")
    const id = message.channel.id;
    for (var i = 0; i < 10  ; i++) {
        if (i%2 === 1) {
            msg.edit("TAC...") 
        }
        else if (i%2 === 0) {
            msg.edit("TIC...")
        }
        if (i === 9) {
            await timer(2000);
            client.channels.cache.get(id).messages.fetch(msg.id).then(message => message.delete())
        }
        await timer(2000); 
      }
    }