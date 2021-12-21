const { config } = require("process");

exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("T'as pas les perms");

		//variables
		const fs = require("fs");
        const MarkovChain = require('purpl-markov-chain');
        const chain = new MarkovChain();
        let cap = args.slice(0, 1).join(' ');
        if (!cap) return message.channel.send("entre un % pour que le bot renvoie une chaine de markov");
        message.channel.send(`${cap}% de chance que markov envoie un message en retour`);

        //filtre qui exclu les messages des bots et les commandes
		const filter = msg => {
		return !msg.content.includes('&') && !msg.author.bot 
        };
        console.log("markov on");
        const collector = message.channel.createMessageCollector(filter);
		collector.on('collect', msg => {
            random = Math.floor(Math.random() * 100);
            //l'owner peut mettre fin a la commande avec "end"
            if (msg.content = "markov.end" && msg.author.id === client.config.ownerID) {
                collector.stop();
                console.log("fin du collector")
            }
            //le bot envoie un message si random est inferieur au chiffre entrer au debut de la commande
            if (random < cap) {
                file = fs.readFileSync('data.txt', 'utf8');
                liste = file.split("|");
                liste.forEach(string => chain.update(`${string}`));
                const msg = chain.generate({grams: 2})
                message.channel.startTyping();
                setTimeout(() => {
                    message.channel.send(msg);
                    message.channel.stopTyping();
                    }, 1000);
            }; 
	});
};
