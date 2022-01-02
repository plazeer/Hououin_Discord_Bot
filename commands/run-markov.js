exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("T'as pas les perms");
        require('dotenv').config()
		//variables
        const translate = require('rita-deepl-translate-api');
		const fs = require("fs");
        const MarkovChain = require('purpl-markov-chain');
        const chain = new MarkovChain();
        let cap = args.slice(0, 1).join(' ');
        let language
        if (!args[1]) language = "fr"
        else language = args[1].toLowerCase()
        if (!cap) return message.channel.send("entre un % pour que le bot renvoie une chaine de markov");
        message.channel.send(`${cap}% de chance que markov envoie un message en retour`);

        //filtre qui exclu les messages des bots et les commandes
		const filter = msg => {
		return !msg.content.includes('&') && !msg.author.bot 
        };
        console.log("markov on");
        const collector = message.channel.createMessageCollector(filter);
		collector.on('collect', async msg => {
            random = Math.floor(Math.random() * 100);
            //l'owner peut mettre fin a la commande avec "end"
            if (msg.content === "markov.end" && msg.author.id === client.config.ownerID) {
                collector.stop();
               console.log("fin du collector")
               return;
            }
            //le bot envoie un message si random est inferieur au chiffre entrer au debut de la commande
            if (random < cap) {
                file = await fs.readFileSync('data.txt', 'utf8');
                liste = await file.split("|");
                liste.forEach(async string => await chain.update(`${string}`));
                const msg = await chain.generate({grams: 2})
                message.channel.startTyping();
                setTimeout(() => {
                    translate(msg, {to: language, apiKey: process.env.DEEPL_KEY})
                    .then(res => {
                        message.channel.send(res.text);
                    });
                    message.channel.stopTyping();
                    }, 1000);
            }; 
	});
};
