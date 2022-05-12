const { MessageEmbed } = require('discord.js');
const cooldown = new Set();
const { move_channel, mute, kick, disco, mute_vc, droit, change_nick} = require('../functions/punition_roulette.js');
module.exports = {
    name: 'roulette',
    aliases: ['gacha', 'g'],
    cooldown: 0,
    description: 'roulette de punition/bonus',
    async run(client, message, args, cmd){
        let participants = [];  // array pour l'embed 
        var x = 0;
        const guild = client.guilds.cache.get(message.guild.id) // id du serveur
        guild.members.fetch().then((members) => {}); //refresh le cache
        let list = []; // liste des personnes qui ont réagis 
        if (cooldown.has(x)) return; //cooldown 
        else try {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle("CLIQUEZ")
            sentmsg = await message.channel.send({ embeds: [embed] }); //création de l'embed
            cooldown.add(x);
            setTimeout(() => {
                cooldown.delete(x); //fin de cooldown
            }, 60000)
            await sentmsg.react('👍') // réaction sur l'embed
            const filter = (reaction, user) => {return reaction.emoji.name === '👍' && !user.bot}; // filtre pour le collector qui retiens que les emoji pouce et si l'utilisateur n'est pas un bot
            const collector = sentmsg.createReactionCollector({filter, time: 30000 });  // création du collector à reaction avec le filtre et 30 sec d'uptime
            collector.on ('collect', (reaction, user) => {
                guild.members.fetch(user).then((members) => {  //récupere tous les membres qui ont réagis
                    if(list.indexOf(members) !== -1) return;
                    participants = []; //si l'utilisateur a déja réagis fait rien
                    list.push(members); // envoie les membres dans list (ligne 13)
                    var i = 1;
                    list.forEach((member) => {
                        const y = i++; //
                        participants.push(y + ".<@" + member + ">");
                    });
                    const embed = new MessageEmbed() // emb ed avec les participants 
                    .setColor('#FFD700')
                    .setTitle("**GACHA**")
                    .setDescription("Le gacha meilleur que dokkan!!!\n \n Qui va cop le **KICK**- , qui va avoir les **DROITS**!!")
                    .addField("**Participants**", participants.join('\n'));
                    sentmsg.edit({ embeds: [embed] });
                });
            });
            collector.on('end', collected => {
                if (list.length === 0) return message.channel.send("REJOIGNEZ LA PROCHAINE FOIS") // Si personne réagis 
                else 
                load(message, client); // le TIC TAC 
                setTimeout( async function() { // Timeout pour attendre 10sec (durée du TIC TAC)
                    max = list.length;
                    random = Math.floor(Math.random() * max);
                    let picked = list.slice(random,random+1); // variable de la personne choisis
                    gacha = Math.floor(Math.random() *100); // pick un nombre entre 0 et 99 
                        const embed = new MessageEmbed() // 2e embed annonce le gagnant 
                        .setColor('#FFD700')
                        .setTitle("**QUI??**")
                        .addFields(
                            { name: '\u200B', value: 'Et le grand **gagnant** du **super gacha** organisé par **Hououin™️©️** est... "' },
                        )                
                        msg = await message.channel.send({ embeds: [embed] });
                        timer(10000); // sleep(10000);
                        if (!picked[0].voice.channel) { // Si pas dans un vocal 
                            if (gacha >= 0 && gacha <= 4) kick(msg, list);
                            else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg) ;
                            else if (gacha >= 15&& gacha <= 69) change_nick(message, picked[0], msg, list, client);
                            else if (gacha >= 70 && gacha <= 99) mute(message, picked[0], msg);
                        } else {
                            if (gacha >= 0 && gacha <= 4) kick(msg, list);
                            else if (gacha >= 5 && gacha <= 14) droit(message, picked[0], msg);
                            else if (gacha >= 15 && gacha <= 39 ) change_nick(message, picked[0], msg, list, client);
                            else if (gacha >= 40 && gacha <= 59 ) disco(picked[0], msg);
                            else if (gacha >= 60 && gacha <= 74 ) mute_vc(picked[0], msg);
                            else if (gacha >= 75 && gacha <= 100 ) move_channel(message, picked[0], msg);
                        }
                }, 10000);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))

//==========================================Fonction TIC TAC ===============================================

const load = async (message, client) => {
    const msg = await message.channel.send("TIC...")
    const id = message.channel.id;
    for (var i = 0; i < 5  ; i++) {
        if (i%2 === 1) {
            msg.edit("TAC...") //si impaire tac
        }
        else if (i%2 === 0) { 
            msg.edit("TIC...") // si paire tic
        }
        if (i === 4) {
            await timer(2000); 
            client.channels.cache.get(id).messages.fetch(msg.id).then(message => message.delete()) // ID du channel puis id du message puis supprime le message TIC TAC 
        }
        await timer(2000); //2sec de pause entre chaque tic et tac 
      }
    }


    
