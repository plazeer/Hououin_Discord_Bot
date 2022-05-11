const cooldown = new Set();
const fs = require('fs');
let ben = [];
let intro = `talking_ben_ben`;
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

fs.readdir("./ben", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".mp3")) return;
        let commandName = file.split(".")[0];
        ben.push(`${commandName}`);
    })
})
let q = [];
module.exports = {
    name: 'ben',
    cooldown: 0,
    description: 'ben',
    async run(client, message, args, cmd){
        var i = 0;
        ben.forEach(vid => {
            if (vid === `${intro}`) ben.splice(i, 1);
            i++;
        });
        let picked = ben[Math.floor(Math.random() * ben.length)]
        let question = args.slice(0).join(" ");
        q.push(picked);
        if(!message.member.voice.channel){
            message.delete();
            message.channel.send("Ben, "+ question)
            message.channel.send({
                files: [`./ben/${picked}.gif`]
            });
            return;
        }
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator})
        message.delete();
        message.channel.send("Ben, "+ question)
        if (!message.guild.me.voice.channel) {
             q.push(intro);
        }
        q.push(picked);
        let resource = createAudioResource(`./ben/${q[0]}.mp3`);
            connection.subscribe(player);
            player.play(resource)
            player.on('idle', () => {
                if (!q[0]) {
                    player.stop();
                    connection.destroy();
                    message.channel.send({
                        files: [`./ben/${picked}.gif`]
                    });
                }
                q.shift();
                resource = createAudioResource(`./ben/${q[0]}.mp3`);
                player.play(resource);

            });
    }
}