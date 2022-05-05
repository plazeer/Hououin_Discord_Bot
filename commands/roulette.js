const ms = require("ms");
const { MessageEmbed } = require('discord.js');
const cooldown = new Set();
module.exports = {
    name: 'roulette',
    aliases: ['gacha', 'g'],
    cooldown: 0,
    description: 'roulette de punition/bonus',
    async run(client, message, args, cmd){
        var x = 0;
        const guild = client.guilds.cache.get(message.guild.id) // id du serveur
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
                    let participants = [];
                    var i = 1;
                    list.forEach((member) => {
                        const y = i++;
                        participants.push(y+". <@"+member+">");
                    });
                    const embed = new MessageEmbed()
                    .setColor('#FFD700')
                    .setTitle("**GACHA**")
                    .setDescription("Le gacha meilleur que dokkan!!!\n \n Qui va cop le **KICK**- , qui va avoir les **DROITS**!!")
                    .addField('**Participants**', participants )
                    sentmsg.edit(embed);
                });
            });
            collector.on('end', collected => {
                if (list.length === 0) return message.channel.send("REJOIGNEZ LA PROCHAINE FOIS")
                else 
                load(message, client);
                setTimeout( async function() {
                    max = list.length;
                    random = Math.floor(Math.random() * max);
                    let picked = list.slice(random,random+1);
                    gacha = Math.floor(Math.random() *100);
                        const embed = new MessageEmbed()
                        .setColor('#FFD700')
                        .setTitle("**QUI??**")
                        .addFields(
                            { name: '\u200B', value: 'Et le grand **gagnant** du **super gacha** organisé par **Hououin™️©️** est... "' },
                        )                
                        msg = await message.channel.send(embed);
                        timer(10000);
                        if (!picked[0].voice.channel) {
                            if (gacha >= 0 && gacha <= 4) kick(message, picked[0], msg);
                            else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg);
                            else if (gacha >= 15 && gacha <= 99) mute(message, picked[0], msg, client);
                        } else {
                            if (gacha >= 0 && gacha <= 4) kick(message, picked[0], msg);
                            else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg);
                            else if (gacha >= 15 && gacha <= 45 ) disco(message, picked[0], msg);
                            else if (gacha >= 46 && gacha <= 75 ) mute_vc(message, picked[0], msg);
                            else if (gacha >= 76 && gacha <= 100 ) move_channel(message, picked[0], msg);
                        }
                }, 10000);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const move_channel = async (message, user, msg) => {
    const id = await message.guild.channels.cache.filter(c => c.type === "voice")
    let list = [];
    id.forEach(vc => {
        list.push(vc.id);
    });
    await user.voice.setChannel(list[Math.floor(Math.random() * list.length)]);
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+"> \n \n **Bravo tu as **GAGNÉ** maintenant va la bas mdr" },
    )                
    msg.edit(embed);
};

const mute = (message, user, msg, client) => {
    let role = message.guild.roles.cache.find(r => r.name === 'muted');
    var rnd = Math.floor(Math.random() * 5);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    user.roles.add(role);
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n haha bravo t'es mute pendant **"+ms(duration)+"in**" },
    )                
    msg.edit(embed);
    setTimeout(function() {
        user.roles.remove(role);
        }, duration);
};

const kick = (message, user, msg) => {
    if(!user.kickable) {
        const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n TOM VA TE FAIRE FOUTRE" },
    )                
    msg.edit(embed);
    } else {
    user.kick();
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n **AU REVOIR**" },
    )                
    msg.edit(embed);
    }
}

const disco = (message, user, msg) => {
    user.voice.kick()
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n BRAVO maintenant **DEHHOOOOORS**" },
    )                
    msg.edit(embed);
};

const mute_vc = (message, user, msg) => {
    rnd = Math.floor(Math.random() * 5);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    rnd2 = Math.floor(Math.random() * 3);
    if (rnd2 === 0) {
    user.voice
    .setDeaf(true)
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n haha bravo t'es mute pendant **"+ms(duration)+"in**" },
    )                
    msg.edit(embed);
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
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n haha bravo t'es mute pendant **"+ms(duration)+"in**" },
    )                
    msg.edit(embed);    
    setTimeout(function() {
        user.voice
        .setDeaf(false);
        user.voice
        .setMute(false);
        }, duration)


    } else if ( rnd2 === 2) {
        user.voice
    .setMute(true)
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n haha bravo t'es mute pendant **"+ms(duration)+"in**" },
    )                
    msg.edit(embed);
    setTimeout(function() {
        user.voice
        .setMute(false);
        }, duration)    
    }
};

const droit = (message, user, msg) => {
    let role = message.guild.roles.cache.find(r => r.name === 'DROIT');
    rnd = Math.floor(Math.random() * 10);
    var n = parseInt(rnd)+1;
    let duration = n * 5000;
    user.roles.add(role);
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n FUYEZ IL A DES DROITS PENDANT**"+ ms(duration)+"**"},
    )                
    msg.edit(embed);
    setTimeout(function() {
        user.roles.remove(role);
        }, duration);
};

const timer = ms => new Promise(res => setTimeout(res, ms))

async function load (message, client) {
    const msg = await message.channel.send("TIC...")
    const id = message.channel.id;
    for (var i = 0; i < 5  ; i++) {
        if (i%2 === 1) {
            msg.edit("TAC...") 
        }
        else if (i%2 === 0) {
            msg.edit("TIC...")
        }
        if (i === 4) {
            await timer(2000);
            client.channels.cache.get(id).messages.fetch(msg.id).then(message => message.delete())
        }
        await timer(2000); 
      }
    }