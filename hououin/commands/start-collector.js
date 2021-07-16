exports.run = async (client, message, args) => {
	if (message.member.hasPermission("MANAGE_ROLES")) {
		// all variables
		const fs = require("fs");
		const filter = m => m.content.includes('')
		//no filter and lasts 24hrs
		const collector = message.channel.createMessageCollector(filter, { time: 86400000 });
		
		console.log("Collecting");
		//collector on show the words collected in the console and adds them in a file splitted by a |
		collector.on('collect', m => {
			console.log(`Collected ${m.content}`);
			let word = m.content;
			fs.appendFileSync('data.txt', word+"|");
		});
		//end the collecting and show the amount of collected messages
		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});
	};
};