const ms = require("ms");
const { MessageEmbed } = require('discord.js');
const { config } = require("dotenv");
const cooldown = new Set();
module.exports = {
    name: 'roulette',
    aliases: ['gacha', 'g'],
    cooldown: 0,
    description: 'roulette de punition/bonus',
    async run(client, message, args, cmd){
        var x = 0;
        const owner = client.guilds.cache.get(client.config.ownerID);
        const guild = client.guilds.cache.get(message.guild.id) // id du serveur
        guild.members.fetch().then((members) => {}); //refresh le cache
        let list = []; // liste des personnes qui ont réagis 
        if (cooldown.has(x)) return; //cooldown 
        else try {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle("CLIQUEZ")
            sentmsg = await message.channel.send(embed); //création de l'embed
            cooldown.add(x);
            setTimeout(() => {
                cooldown.delete(x); //fin de cooldown
            }, 60000)
            await sentmsg.react('👍') // réaction sur l'embed
            const filter = (reaction, user) => {return reaction.emoji.name === '👍' && !user.bot}; // filtre pour le collector qui retiens que les emoji pouce et si l'utilisateur n'est pas un bot
            const collector = sentmsg.createReactionCollector(filter, { time: 30000 }); // création du collector à reaction avec le filtre et 30 sec d'uptime
            collector.on ('collect', (reaction, user) => {
                guild.members.fetch(user).then((members) => {  //récupere tous les membres qui ont réagis
                    if(list.indexOf(members) !== -1) return; //si l'utilisateur a déja réagis fait rien
                    list.push(members); // envoie les membres dans list (ligne 13)
                    let participants = []; // array pour l'embed 
                    var i = 1;
                    list.forEach((member) => { // boucle forEach pour chaque membre i+1 et son pseudo (ex : 1. @plazeer)
                        const y = i++; //
                        participants.push(y+". <@"+member+">");
                    });
                    const embed = new MessageEmbed() // embed avec les participants 
                    .setColor('#FFD700')
                    .setTitle("**GACHA**")
                    .setDescription("Le gacha meilleur que dokkan!!!\n \n Qui va cop le **KICK**- , qui va avoir les **DROITS**!!")
                    .addField('**Participants**', participants )
                    sentmsg.edit(embed);
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
                        msg = await message.channel.send(embed);
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

//==========================================Fonction pour move de channel===============================================


const move_channel = async (message, user, msg) => {
    console.log("move_channel ============================");
    const id = await message.guild.channels.cache.filter(c => c.type === "voice")
    let list = [];
    id.forEach(vc => {
        list.push(vc.id); //envoie l'id de tous les channels dans list
    });
    let channel = user.voice.channel
    console.log("avant while "+channel)
        do {
            channel = list[Math.floor(Math.random() * list.length)];
            console.log("test boucle 1 "+channel)
            console.log(channel === user.voice.channel)
        } while (channel === user.voice.channel) 
    console.log("apres while "+channel)
    if ((list[Math.floor(Math.random() * list.length)] !== user.voice.channel)) console.log("move_channel ok")
    await user.voice.setChannel(channel); //envoie dans un vocal aléatoire
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+"> \n \n **Bravo tu as **GAGNÉ** maintenant va la bas mdr" },
    )                
    msg.edit(embed);
};

//==========================================Fonction pour mute écrit===============================================


const mute = (message, user, msg) => {
    console.log("mute ecrit =========================");
    let role = message.guild.roles.cache.find(r => r.name === 'muted'); //cherche le role muted 
    var rnd = Math.floor(Math.random() * 3);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    user.roles.add(role); //donne le role muted au gagnant
    console.log("debut du mute de "+user.user.username+" pendant "+ms(duration))
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n haha bravo t'es mute pendant **"+ms(duration)+"in**" },
    )                
    msg.edit(embed);
    setTimeout(function() {
        console.log("fin du mute de "+user.user.username)
        user.roles.remove(role);
        }, duration);
};

//==========================================Fonction pour kick===============================================


const kick = (msg, liste) => {
    console.log("kick =========================");
    let victime;
    do { 
        victime = liste[Math.floor(Math.random() * liste.length)];
        console.log("username :"+victime.user.username)
        console.log("kickable :"+victime.kickable)
    } while (!victime.kickable);
    victime.kick(); 
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+victime+"> \n \n **AU REVOIR**" },
    )                
    msg.edit(embed);
}

//==========================================Fonction pour déconnecter quelqu'un du vocal===============================================


const disco = (user, msg) => {
    console.log("déconnecter ============================");
    console.log(user.user.username+" s'est fait déco")
    user.voice.kick()  //déco du vc
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n BRAVO maintenant **DEHHOOOOORS**" },
    )                
    msg.edit(embed);
};

//==========================================Fonction pour mute vocal===============================================


const mute_vc = (user, msg) => {
    rnd = Math.floor(Math.random() * 3);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    rnd2 = Math.floor(Math.random() * 3);

    //MUTE CASQUE SEULEMENT
    if (rnd2 === 0) {
        console.log("mute casque pour"+user.user.username+" pendant "+ms(duration));
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
    
    //MUTE CASQUE ET MICRO
    else if ( rnd2 === 1) {
        console.log("mute casque/micro pour"+user.user.username+" pendant "+ms(duration));
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

    //MUTE MICRO
    } else if ( rnd2 === 2) {
        console.log("mute micro pour"+user.user.username+" pendant "+ms(duration));
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

//==========================================Fonction pour donner des droits ===============================================


const droit = async (message, user, msg) => {
    console.log("droit ================================");
    let role = message.guild.roles.cache.find(r => r.name === 'DROIT'); //cherche le role DROIT  
    rnd = Math.floor(Math.random() * 10);
    var n = parseInt(rnd)+1;
    let duration = n * 5000;
    console.log("Les droits pour "+user.user.username+" pendant "+ms(duration));

    await user.roles.add(role); // donne le role DROIT
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n FUYEZ IL A DES DROITS PENDANT**"+ ms(duration)+"**"},
    )                
    msg.edit(embed);
    setTimeout(function() {
        console.log("fin des droits pour "+user.user.username);
        user.roles.remove(role);
        }, duration);
};
//==========================================sleep()===============================================


const timer = ms => new Promise(res => setTimeout(res, ms))

//==========================================Fonction TIC TAC ===============================================


async function load (message, client) {
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

//==========================================Fonction pour changer le pseudo===============================================

const change_nick = async (message, user, msg, liste, client) => {
    console.log("change nick ================================");
    let list = [];
    var i = 0;
    var x = 0;
    liste.forEach((member) => {
        console.log("OUT  :"+i, member.user.username)
        if (member.user.id === client.config.ownerID) liste.splice(i, 1);
        i++;
    });
    liste.forEach((member) => {
        console.log("OUT  :"+x, member.user.username)
        if (member.user.id === user.user.id) liste.splice(x, 1);
        x++;
    });
    let victime = liste[Math.floor(Math.random() * list.length)];
    console.log("gagnant :"+user.user.username)
    if (liste.length >= 2) {
        console.log("victime :"+victime.user.username)
        const filter = msg => {return !msg.author.bot && !msg.content.includes('&')}; // filtre si pas un bot et si l'auteur du message est bien le gagnant
        const collector = message.channel.createMessageCollector(filter, { time: 30000 }); // 30sec + filtre 
        message.channel.send("VITE <@"+user+"> DIT UN PSEUDO POUR REMPLACER CELUI DE <@"+victime+">")
        collector.on('collect', async msg => {
            if (msg.author.id !== user.id) return;
            else {
                if (msg.content.split('').length > 32) return message.channel.send("Trop long") //si le pseudo est trop long ca annule
                else {
                    list.push(msg.content); //envoie le pseudo dans list
                    collector.stop() // stop le collecteur
                }
            }
        });

        collector.on('end', async collected => {
            if (list.length === 0) { //si personne repond pour rename envoie un embed 
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n Il a fait le choix de pas rename malheureusement"},
                )   
                 msg.edit(embed);

            } else {
                victime.setNickname(list[0]);
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n <@"+victime+"> s'appelle maintenant **"+list[0]+"**3"},
                )                
                msg.edit(embed);
            };
        });

    } else {
        if (user.id === client.config.ownerID) {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .addFields(
            { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n mais pas de chance du coup quoi"},
            )   
            msg.edit(embed);

        } else {
            console.log("gagnant/victime car liste < 2 :"+user.user.username)
        const filter = msg => {return !msg.content.includes('&') && !msg.author.bot}; // filtre si pas un bot et si l'auteur du message est bien le gagnant
        const collector = message.channel.createMessageCollector(filter, { time: 30000 }); // 30sec + filtre
        message.channel.send("VITE DITES UN PSEUDO POUR REMPLACER CELUI DE <@"+user+">") 

        collector.on('collect', async msg => {
            if (msg.author.id === user.id) return;
            else {
                if (msg.content.split('').length > 32) return message.channel.send("Trop long") //si le pseudo est trop long ca annule
                else {
                    list.push(msg.content); //envoie le pseudo dans list
                    collector.stop() // stop le collecteur
                }
            }
        });
        collector.on('end', collected => {
            if (list.length === 0) { //si personne repond pour rename envoie un embed 
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n Il a de la chance, y'aura pas de rename cette fois ci..."},
                )   
                msg.edit(embed);
            } else {
                user.setNickname(list[0]); // change son pseudo
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n <@"+user+"> s'appelle maintenant **"+list[0]+"**!!!"},
                )                
                msg.edit(embed);
                };
            });
        };
    };
}; 

    
