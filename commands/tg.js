exports.run = (client, message, args) => {
    if (message.mentions.members.first()) {
        var phrase = args.slice(1).join(' ');
        let userID = message.mentions.members.first().user;
        if (!phrase) return message.delete();
        message.delete();
        userID.send(phrase);
    } else if (!isNaN(args[0])) {
        let user = message.guild.members.cache.get(args[0]);
        var phrase = args.slice(1).join(' ');
        if (!phrase) return message.delete();
        message.delete();
        user.send(phrase);
    } else if (!args[0]) {
        message.channel.send("mentionne qlq") 
    }
}