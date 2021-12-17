const cooldown = new Set();
exports.run = async (client, message, args) => {
    const member = message.author.id;
    for (let i = 0; i < 3; i++) {
        const list = client.guilds.cache.get("584833650193858814");
        await list.members.fetch()
    }
    if (cooldown.has(member)) {
        message.channel.send("Spamo no")
    } else if (message.mentions.members.first()) {
        var phrase = args.slice(1).join(' ');
        let userID = message.mentions.members.first().user;
        if (!phrase) return message.delete();
        message.delete();
        userID.send(phrase);
        cooldown.add(member);
        setTimeout(() => {
            cooldown.delete(member);
        }, 600000);
    } else if (!isNaN(args[0])) {
        let user = message.guild.members.cache.get(args[0]);
        var phrase = args.slice(1).join(' ');
        if (!phrase) return message.delete();
        message.delete();
        user.send(phrase);
        cooldown.add(member);
        setTimeout(() => {
            cooldown.delete(member);
        }, 600000);
    } else if (!args[0]) {
        message.channel.send("&tg mention + phrase")
    }
}