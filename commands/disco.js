module.exports = {
    name: 'disco',
    aliases: ['d'],
    cooldown: 0,
    description: 'roulette de punition/bonus',
    async run(client, message, args, cmd){
        if (message.author.id !== client.config.ownerID) return;
        else {
            if (message.mentions.members.first()) {
            let x = message.mentions.members.first();
            x.voice.kick();
            message.delete();
            } else if (!isNaN(args[0])) {
            let x = message.guild.members.cache.get(args[0]);
            x.voice.kick();
            message.delete();
            }
        }
    }
}