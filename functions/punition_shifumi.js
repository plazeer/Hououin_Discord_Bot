const ms = require("ms");
exports.move_channel = async function(message, perdant){
    if (!perdant.voice.channel) return message.channel.send("Pas en vocal")
    console.log("move_channel ============================");
    const id = await message.guild.channels.cache.filter(c => c.type === "GUILD_VOICE")
    let list = [];
    id.forEach(vc => {
        list.push(vc.id); //envoie l'id de tous les channels dans list
    });
    let channel = perdant.voice.channel
    console.log("avant while "+channel)
    let i = 0;
        do {
            channel = list[Math.floor(Math.random() * list.length)];
            console.log("test boucle 1 "+channel)
            console.log(channel === perdant.voice.channel)
            i++;
            if (i === 50) break;
        } while (channel === perdant.voice.channel) 
    console.log("apres while "+channel)
    if ((list[Math.floor(Math.random() * list.length)] !== perdant.voice.channel)) console.log("move_channel ok")
    await perdant.voice.setChannel(channel); //envoie dans un vocal aléatoire
};

//==========================================Fonction pour mute écrit===============================================


exports.mute = async function(message, perdant){
    console.log("mute ecrit =========================");
    let role = message.guild.roles.cache.find(r => r.name === 'muted'); //cherche le role muted 
    var rnd = Math.floor(Math.random() * 3);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    perdant.roles.add(role); //donne le role muted au gagnant
    message.channel.send(perdant.user.username+" est mute pendant "+ ms(duration));
    console.log("debut du mute de "+perdant.user.username+" pendant "+ms(duration))
    setTimeout(function() {
        console.log("fin du mute de "+perdant.user.username)
        perdant.roles.remove(role);
        }, duration);
};

//==========================================Fonction pour déconnecter quelqu'un du vocal===============================================


exports.disco = async function(perdant){
    if (!perdant.voice.channel) return message.channel.send("Pas en vocal")
    console.log("déconnecter ============================");
    console.log(perdant.user.username+" s'est fait déco")
    perdant.voice.disconnect();  //déco du vc
};

//==========================================Fonction pour mute vocal===============================================


exports.mute_vc = async function(message, perdant){
    if (!perdant.voice.channel) return message.channel.send("Pas en vocal")
    rnd = Math.floor(Math.random() * 3);
    var n = parseInt(rnd)+1;
    let duration = n * 60000;
    rnd2 = Math.floor(Math.random() * 3);

    //MUTE CASQUE SEULEMENT
    if (rnd2 === 0) {
        message.channel.send(perdant.user.username+" est mute pendant "+ ms(duration));
        console.log("mute casque pour"+perdant.user.username+" pendant "+ms(duration));
        perdant.voice
        .setDeaf(true)
        setTimeout(function() {
            perdant.voice
            .setDeaf(false);
            }, duration)
        }
    
    //MUTE CASQUE ET MICRO
    else if ( rnd2 === 1) {
        message.channel.send(perdant.user.username+" est mute pendant "+ ms(duration));
        console.log("mute casque/micro pour"+perdant.user.username+" pendant "+ms(duration));
        perdant.voice
        .setDeaf(true);
        perdant.voice
        .setMute(true) 
        setTimeout(function() {
            perdant.voice
            .setDeaf(false);
            perdant.voice
            .setMute(false);
        }, duration)

    //MUTE MICRO
    } else if ( rnd2 === 2) {
        message.channel.send(perdant.user.username+" est mute pendant "+ ms(duration));
        console.log("mute micro pour"+perdant.user.username+" pendant "+ms(duration));
        perdant.voice
        .setMute(true)
        setTimeout(function() {
            perdant.voice
            .setMute(false);
        }, duration)    
    }
};

//==========================================Fonction pour changer le pseudo===============================================

exports.change_nick = async function(message, gagnant, perdant, client){
    console.log("change nick ================================");
    let list = [];
    console.log("gagnant :"+gagnant.user.username)
    console.log("perdant :"+perdant.user.username);
    if(perdant.user.id === client.config.ownerID) return message.channel.send("Dommage c'est Tom qu'a perdu donc ca peut pas marcher")
    const filter = msg => {return !msg.author.bot && !msg.content.includes('&')}; // filtre si pas un bot et si l'auteur du message est bien le gagnant
    const collector = message.channel.createMessageCollector({filter, time: 30000 }); // 30sec + filtre 
    message.channel.send("Choisi un pseudo pour remplacer celui de <@"+perdant+">")
        collector.on('collect', async msg => {
            if (msg.author.id !== gagnant.id) return;
            else {
                if (msg.content.split('').length > 32) return message.channel.send("Trop long") //si le pseudo est trop long ca annule
                else {
                    list.push(msg.content); //envoie le pseudo dans list
                    collector.stop() // stop le collecteur
                }
            }
        });
        collector.on('end', async collected => {
            if (list.length === 0) return message.channel.send("Fallait changer le pseudo")
                perdant.setNickname(list[0]);
                message.channel.send(perdant.user.username+" s'appelle maintenant <@"+perdant+">");

        });
    }
