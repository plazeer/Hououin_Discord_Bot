exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to use this command.");

		// all variables
		const fs = require("fs");
        const MarkovChain = require('purpl-markov-chain');
        const chain = new MarkovChain();
        let cap = args.slice(0, 1).join(' ');
        if (!cap) return message.channel.send("Enter a % of chance for markov to answer a message.");
        message.channel.send(`${cap}% de chance que markov envoie un message en retour`);

        //define the filter for the collector here it excludes messages that start with the prefix and are from the bot
		const filter = msg => {
		return !msg.content.includes('&') && !msg.author.bot };

		//bot filter and 24hrs
		const collector = message.channel.createMessageCollector(filter);
		
		console.log("Collecting pour markov");

		//collector on show the words collected in the console and adds them in a file splitted by a |
		collector.on('collect', msg => {
			console.log(`Collected ${msg.content}`);
			let word = msg.content;
			fs.appendFileSync('data.txt', word+"|");
            random = Math.floor(Math.random() * 100);

            //the bot sends a message if the random number is above what we chose in the args
            if (random < cap) {
                file = fs.readFileSync('data.txt', 'utf8');
                liste = file.split("|");
                liste.forEach(string => chain.update(`${string}`));
                const msg = chain.generate({grams: 2})
                message.channel.startTyping();
                setTimeout(() => {
                    message.channel.send(msg);
                    message.channel.stopTyping();
                    }, 500);
            }; 
	});
};
