module.exports = {
    name: 'translate',
    aliases: ['tl'],
    cooldown: 0,
    description: 'translation',
    async run(client, message, args, cmd){
        require('dotenv').config()
        const translate = require('rita-deepl-translate-api');
        if (!args[1]) return message.channel.send("Mettez une phrase a traduire")
        if (!args[0]) return message.channel.send("Mettez en quelle langue traduire")
        let array = ['bg', 'zh' ,'cs', 'da', '']
        let language = args[0].toLowerCase()
        let phrase = args.slice(1).join(" ")
      //  const filter = msg => {
      //      return !msg.content.includes('&') && !msg.author.bot 
       //     };
      //      const collector = message.channel.createMessageCollector(filter);
      //      collector.on('collect', async msg => {
      //          
        setTimeout(() => {
            translate(phrase, {to: language, apiKey: process.env.DEEPL_KEY})
                            .then(res => {
                                message.channel.send(res.text);
                            });
            message.channel.stopTyping();
            }, 1000);

    }
}

