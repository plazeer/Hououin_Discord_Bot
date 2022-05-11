const { Permissions } = require('discord.js');
exports.run = (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("T'as pas les perms");

    // all variables
    const fs = require("fs");
    let words = ['ratio', 'ratio bozo', 'ratio dans ta mere bouffon', 'ratio + pas lu', 'tg ratio', 'https://tenor.com/view/ratiobozo-ratio-gif-23500921', 'https://tenor.com/view/zyzz-ratio-gif-22822910', 'https://tenor.com/view/ratio-twitter-matt-tera-gif-23391300', 'https://tenor.com/view/smt-nocturne-shin-megami-tensei-metatron-fire-of-sinai-gif-21973114', 'https://tenor.com/view/ratio-moyai-moai-gif-23067679','megaratio', 'cringe + ratio', "ratio'd", "https://imgur.com/vbgSS4F"]
    let max = words.length
    let cap = args.slice(0, 1).join(' ');
    if (!cap) return message.channel.send("Pas de chiffre");
    message.channel.send(`${cap}% de ratio`);

    //filtre qui exclu les messages des bots et les commandes
    const filter = msg => {
    return !msg.content.includes('&') && !msg.author.bot };

    const collector = message.channel.createMessageCollector({filter});
    console.log("ratio machine on");

    collector.on('collect', msg => {
        random = Math.floor(Math.random() * 100);
        //l'owner peut mettre fin a la commande avec "end"
        if (msg.content === "ratio.end" && msg.author.id === client.config.ownerID) {
            collector.stop();
            console.log("fin du collector");
        };
            //le bot envoie un message si random est inferieur au chiffre entrer au debut de la commande
            if (random < cap) {
            random = Math.floor(Math.random() * max);
            plusone = random+1;
            let picked = words.slice(random,plusone);
                message.channel.send(picked);
        }; 
});
};


