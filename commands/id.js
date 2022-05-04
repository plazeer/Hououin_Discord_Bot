module.exports = {
    name: 'id',
    cooldown: 0,
    description: 'idk',
    async run(client, message, args, cmd){
        id = message.mentions.members.first().id;
        message.channel.send("L'id est : "+id)
    }
}