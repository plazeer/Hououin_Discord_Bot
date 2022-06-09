module.exports = {
    name: 'disco',
    aliases: ['d'],
    cooldown: 0,
    description: 'déconnexion',
    async run(client, message, args, cmd){
        if (message.author.id !== client.config.ownerID) return;
        else {
            if (message.mentions.members.first()) {
            let x = message.mentions.members.first();
            x.voice.disconnect();
            message.delete();
            } else if (!isNaN(args[0])) {
            let x = message.guild.members.cache.get(args[0]);
            x.voice.disconnect();
            message.delete();
            }
        }
    }
}