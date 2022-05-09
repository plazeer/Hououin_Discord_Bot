const cooldown = new Set();
const fs = require('fs');
let ben = [];
let intro = `talking_ben_ben`;
var i = 0;

fs.readdir("./ben", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".mp3")) return;
        let commandName = file.split(".")[0];
        ben.push(`${commandName}`);
    })
})
ben.forEach(vid => {
    if (vid === `${intro}`) ben.splice(i, 1);
    i++;
});
let q = [];
module.exports = {
    name: 'ben',
    cooldown: 0,
    description: 'ben',
    async run(client, message, args, cmd){
        let question = args.slice(0).join(" ");
        message.delete();
        message.channel.send("Ben, "+ question)
        let picked = ben[Math.floor(Math.random() * ben.length)]
        if (!message.guild.me.voice.channel) {
             q.push(intro);
        }
        q.push(picked);
            if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
                //if (message.author.id === client.config.ownerID){
                    try {
                        const connection = await message.member.voice.channel.join();
                        play(message, q, connection);
                    } catch (err) {
                        message.channel.send('erreur dans la connexion');
                        throw err;
                    }
                //}
            }
        }
    


const play = (message, q, connection) => {
    const stream = connection.play(`./ben/${q[0]}.mp3`, { filter: 'audioonly' });
    stream.on('finish', () => {
        if (q.length !== 0) {
            message.channel.send({
                files: [`./ben/${q[0]}.gif`]
            });
            q.shift();
            play(message, q, connection);
        } else {
            stream.destroy();
            message.guild.me.voice.channel.leave();
        }
    });
}