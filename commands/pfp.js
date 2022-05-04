exports.run = async (client, message, args) => {
    const list = client.guilds.cache.get("584833650193858814");
    await list.members.fetch()
    if (message.mentions.members.first()) {
    const { MessageEmbed } = require('discord.js');
        let id = await message.mentions.members.first().id;
        let username = client.users.cache.find(user => user.id === id)
        let userID = await message.mentions.members.first();
        let guildID = message.guild.id;
        let tag = username.tag;
        let image = client.guilds.resolve(guildID).members.resolve(userID).user.displayAvatarURL({size : 2048, dynamic : true})
        const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle("URL de l'avatar")
            .setURL(image)
            .setImage(image)
            .setFooter(tag)
        message.channel.send(embed);
    } else if (!isNaN(args[0])) {
        const { MessageEmbed } = require('discord.js');
        let id = args[0];
        let username = client.users.cache.find(user => user.id === id)
        let userID = message.guild.members.cache.get(args[0]);
        let guildID = message.guild.id;
        let tag = username.tag;
        let image = client.guilds.resolve(guildID).members.resolve(userID).user.displayAvatarURL({size : 2048, dynamic : true})
        const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle("URL de l'avatar")
            .setURL(image)
            .setImage(image)
            .setFooter(tag)
        message.channel.send(embed);
    } else if (!args[0]) return message.channel.send("Faut mentionner")
}

