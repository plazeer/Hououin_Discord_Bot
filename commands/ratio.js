exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to use this command.");

    // all variables
    const fs = require("fs");
    let words = ['ratio', 'ratio bozo', 'ratio dans ta mere bouffon', 'ratio + pas lu', 'tg ratio', 'https://tenor.com/view/ratiobozo-ratio-gif-23500921', 'https://tenor.com/view/zyzz-ratio-gif-22822910', 'https://tenor.com/view/ratio-twitter-matt-tera-gif-23391300', 'https://tenor.com/view/smt-nocturne-shin-megami-tensei-metatron-fire-of-sinai-gif-21973114', 'https://tenor.com/view/ratio-moyai-moai-gif-23067679','megaratio', 'cringe + ratio', "ratio'd"]
    let max = words.length
    let cap = args.slice(0, 1).join(' ');
    if (!cap) return message.channel.send("Pas de chiffre");
    message.channel.send(`${cap}% de ratio`);

    //define the filter for the collector here it excludes messages that start with the prefix and are from the bot
    const filter = msg => {
    return !msg.content.includes('&') && !msg.author.bot };

    //bot filter and 24hrs
    const collector = message.channel.createMessageCollector(filter);
    
    console.log("ratio machine on");

    //collector on show the words collected in the console and adds them in a file splitted by a |
    collector.on('collect', msg => {
        random = Math.floor(Math.random() * 100);
        //the bot sends a message if the random number is above what we chose in the args
        if (random < cap) {
            random = Math.floor(Math.random() * max);
            plusone = random+1;
            let picked = words.slice(random,plusone);
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(picked);
                message.channel.stopTyping();
                }, 500);
        }; 
});
};


