module.exports = {
    name: 'translate',
    aliases: ['tl', 'languages'],
    cooldown: 0,
    description: 'translation',
    async run(client, message, args, cmd){
        const langs = ['bg','zh','cs','da', 'nl','en', 'et', 'fi', 'fr', 'de','el', 'hu','it','ja', 'lv', 'lt','pl','pt','ro','ru','es','sv'];
        let list = [];
        const { MessageEmbed } = require('discord.js');
        require('dotenv').config()
        const trad = require('rita-deepl-translate-api');
            if (cmd === 'tl' || cmd === 'translate') {
                if (message.type === 'REPLY') {
                message.fetchReference()
                .then(msg => {
                    phrase = msg.content
                })
            }
            if (!args[0] && message.type !== 'REPLY') return message.channel.send("Mettez une phrase à traduire ")
            let phrase = args.slice(0).join(" ")
            const embed = new MessageEmbed()
                .setColor('#FFD700')
                .setTitle("TRADUCTEUR")
                .addFields(
                    { name: '\u200B', value: "**bg**: 'Bulgarian'\n**zh**: 'Chinese'\n**cs**: 'Czech' \n**da**: 'Danish' \n**nl**: 'Dutch' \n**en**: 'English' \n**et**: 'Estonian' \n**fi**: 'Finnish' \n**fr**: 'French'\n**de**: 'German'\n**el**: 'Greek' \n**hu**: 'Hungarian' \n**it**: 'Italian' \n**ja**: 'Japanese' \n**lv**: 'Latvian' \n**lt**: 'Lithuanian' \n**pl**: 'Polish' \n**pt**: 'Portuguese' \n**ro**: 'Romanian' \n**ru**: 'Russian' \n**es**: 'Spanish' \n**sv**: 'Swedish'"},
                )  
                sentmsg = await message.channel.send({ embeds: [embed] }); //création de l'embed
                const id = sentmsg.channel.id;
                const filter = msg => {return !msg.content.includes('&') && !msg.author.bot };
                    console.log("traduction ======================================");
                    const collector = message.channel.createMessageCollector(filter, { time: 30000 });
                    collector.on('collect', async msg => {
                        if (msg.author.id !== message.author.id) return;
                        else {
                                if (!langs.includes(msg.content)) return message.channel.send("regarde dans l'embed les langues")
                            else {
                                list.push(msg.content); //envoie le pseudo dans list
                                client.channels.cache.get(msg.channel.id).messages.fetch(msg.id).then(message => message.delete())
                                collector.stop() // stop le collecteur
                            }
                        }
                   });
                    collector.on('end', collected => {
                trad(phrase, {to: list[0], apiKey: process.env.DEEPL_KEY})
                .then(res => {
                    message.channel.send("⬇️ "+list[0]+" ⬇️")
                    message.channel.send(res.text);
                    console.log(phrase+"\n ⬇️ "+list[0]+" ⬇️ \n"+res.text);
                 client.channels.cache.get(id).messages.fetch(sentmsg.id).then(message => message.delete())
                 });
            });
        } else if (cmd === 'languages') {
            const embed = new MessageEmbed()
                .setColor('#FFD700')
                .setTitle("TRADUCTEUR")
                .addFields(
                    { name: '\u200B', value: "**bg**: 'Bulgarian'\n**zh**: 'Chinese'\n**cs**: 'Czech' \n**da**: 'Danish' \n**nl**: 'Dutch' \n**en**: 'English' \n**et**: 'Estonian' \n**fi**: 'Finnish' \n**fr**: 'French'\n**de**: 'German'\n**el**: 'Greek' \n**hu**: 'Hungarian' \n**it**: 'Italian' \n**ja**: 'Japanese' \n**lv**: 'Latvian' \n**lt**: 'Lithuanian' \n**pl**: 'Polish' \n**pt**: 'Portuguese' \n**ro**: 'Romanian' \n**ru**: 'Russian' \n**es**: 'Spanish' \n**sv**: 'Swedish'"},
                )  
                sentmsg = await message.channel.send({ embeds: [embed] });
        }
    }
}

