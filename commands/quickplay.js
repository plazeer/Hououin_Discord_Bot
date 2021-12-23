const cooldown = new Set();
exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    if (message.guild.me.voice.channel) return message.channel.send("deja dans un vc");
    if (cooldown.has("max")) {
        message.channel.send("calmos")
    } else {
        const ytdl = require('ytdl-core');
        const connection = await message.member.voice.channel.join();
        const stream = connection.play(ytdl(args[0], { filter: 'audioonly' }));
        message.delete();
        stream.on('finish', () => {
            ytdl.getInfo(args[0]).then(info => {
                console.log('Done playing '+info.videoDetails.title);
            })
            stream.destroy();
            message.member.voice.channel.leave();
        });
        cooldown.add("max");
        setTimeout(() => {
            cooldown.delete("max");
        }, 15000);
    }
} 