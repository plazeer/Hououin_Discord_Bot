const cooldown = new Set();
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    if (message.guild.me.voice.channel) return message.channel.send("deja dans un vc");
    if (cooldown.has("max")) {
        message.delete();
        return;
    } else {
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator})
        message.delete();
        let resource = createAudioResource(await ytdl('https://www.youtube.com/watch?v=bPgQXuk1DzE'));
        connection.subscribe(player);
        player.play(resource);
        player.on('idle', async () => {
            await player.stop();
            console.log('Done playing bingchilling sound effect');
            connection.destroy();
        });
        cooldown.add("max");
        setTimeout(() => {
            cooldown.delete("max");
        }, 60000);
    }
}