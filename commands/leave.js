exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    message.member.voice.channel.leave();
}