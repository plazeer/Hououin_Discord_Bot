exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.ownerID) return message.channel.send("ahahhahaha bah dit donc ?");

    for (let i = 0; i < 3; i++) {
        const list = client.guilds.cache.get("584833650193858814");
        await list.members.fetch()
    }
    let max = args[1];
    let id = args[0];
    let phrase = args.slice(2).join(" ");
    let user = message.guild.members.cache.get(id);
    let ping = message.mentions.members.first();
    if (message.mentions.members.first()) {
        for (let i = 0; i < max; i++) {
            ping.send(phrase)
        }
    } else if (!isNaN(args[0])) {
        for (let i = 0; i < max; i++) {
            user.send(phrase)
        }
    }else if (!args[0]) {
        message.channel.send("&spam id nombre phrase")
    }
}