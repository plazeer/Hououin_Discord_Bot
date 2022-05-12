const { MessageEmbed } = require('discord.js');
const ms = require("ms");

exports.move_channel = async function(message, user, msg){
    console.log("move_channel ============================");
    const id = await message.guild.channels.cache.filter(c => c.type === "voice")
    let list = [];
    id.forEach(vc => {
        list.push(vc.id); //envoie l'id de tous les channels dans list
    });
    let channel = user.voice.channel
    console.log("avant while "+channel)
    let i = 0;
        do {
            channel = list[Math.floor(Math.random() * list.length)];
            console.log("test boucle 1 "+channel)
            console.log(channel === user.voice.channel)
            i++;
            if (i === 50) break;
        } while (channel === user.voice.channel) 
    console.log("apres while "+channel)
    if ((list[Math.floor(Math.random() * list.length)] !== user.voice.channel)) console.log("move_channel ok")
    await user.voice.setChannel(channel); //envoie dans un vocal aléatoire
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+"> \n \n **Bravo tu as **GAGNÉ** maintenant va la bas mdr" },
    )                
    msg.edit({ embeds: [embed] });
};

//==========================================Fonction pour mute écrit===============================================


exports.mute = async function(message, user, msg){
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
    msg.edit({ embeds: [embed] });
    setTimeout(function() {
        console.log("fin du mute de "+user.user.username)
        user.roles.remove(role);
        }, duration);
};

//==========================================Fonction pour kick===============================================


exports.kick = async function(msg, liste){
    console.log("kick =========================");
    let victime;
    let i = 0;
    do { 
        victime = liste[Math.floor(Math.random() * liste.length)];
        console.log("username :"+victime.user.username)
        console.log("kickable :"+victime.kickable)
        i++;
        if (i === 50) {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .addFields(
            {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+victime+"> \n \n mais je peux pas le kick" },
            )                
            msg.edit({ embeds: [embed] });
            return;
        }
    } while (!victime.kickable);
    victime.kick(); 
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+victime+"> \n \n **AU REVOIR**" },
    )                
    msg.edit({ embeds: [embed] });
}

//==========================================Fonction pour déconnecter quelqu'un du vocal===============================================


exports.disco = async function(user, msg){
    console.log("déconnecter ============================");
    console.log(user.user.username+" s'est fait déco")
    user.voice.disconnect();  //déco du vc
    const embed = new MessageEmbed()
    .setColor('#FFD700')
    .addFields(
    {  name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n BRAVO maintenant **DEHHOOOOORS**" },
    )                
    msg.edit({ embeds: [embed] });
};

//==========================================Fonction pour mute vocal===============================================


exports.mute_vc = async function(user, msg){
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
        msg.edit({ embeds: [embed] });
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
        msg.edit({ embeds: [embed] });    
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
        msg.edit({ embeds: [embed] });
        setTimeout(function() {
            user.voice
            .setMute(false);
        }, duration)    
    }
};

//==========================================Fonction pour donner des droits ===============================================


exports.droit = async function(message, user, msg){
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
    msg.edit({ embeds: [embed] });
    setTimeout(function() {
        console.log("fin des droits pour "+user.user.username);
        user.roles.remove(role);
        }, duration);
};
//==========================================Fonction pour changer le pseudo===============================================

exports.change_nick = async function(message, user, msg, liste, client){
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
        const collector = message.channel.createMessageCollector({filter, time: 30000 }); // 30sec + filtre 
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
                 msg.edit({ embeds: [embed] });

            } else {
                victime.setNickname(list[0]);
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n **<@'+user+">** \n \n <@"+victime+"> s'appelle maintenant **"+list[0]+"**3"},
                )                
                msg.edit({ embeds: [embed] });
            };
        });

    } else {
        if (user.id === client.config.ownerID) {
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .addFields(
            { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n mais pas de chance du coup quoi"},
            )   
            msg.edit({ embeds: [embed] });

        } else {
            console.log("gagnant/victime car liste < 2 :"+user.user.username)
        const filter = msg => {return !msg.content.includes('&') && !msg.author.bot}; // filtre si pas un bot et si l'auteur du message est bien le gagnant
        const collector = message.channel.createMessageCollector({filter, time: 30000 }); // 30sec + filtre
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
                msg.edit({ embeds: [embed] });
            } else {
                user.setNickname(list[0]); // change son pseudo
                const embed = new MessageEmbed()
                .setColor('#FFD700')
                .addFields(
                { name: '\u200B', value: 'Et le grand **gagnant** du super gacha organisé par **Hououin™️©️** est... \n \n <@'+user+"> \n \n <@"+user+"> s'appelle maintenant **"+list[0]+"**!!!"},
                )                
                msg.edit({ embeds: [embed] });
                };
            });
        };
    };
}; 