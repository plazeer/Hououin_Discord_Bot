const cooldown = new Set();
exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    if (cooldown.has("max")) {
        message.channel.send("calmos")
    } else {
        const ytdl = require('ytdl-core');
        const connection = await message.member.voice.channel.join();
        const stream = connection.play(ytdl('https://www.youtube.com/watch?v=Q_9VMaX61nI', { filter: 'audioonly' }));
        stream.on('finish', () => {
            console.log('Done playing');
            stream.destroy();
            message.member.voice.channel.leave();
        });
        cooldown.add("max");
        setTimeout(() => {
            cooldown.delete("max");
        }, 15000);
    }
}