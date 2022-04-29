const cooldown = new Set();
const fs = require('fs');
let soundeffect = [];
fs.readdir("./sound_effects/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        soundeffect.push(file);
    })
})  
module.exports = {
    name: 'soundeffect',
    aliases: ['se', 'bruh'],
    cooldown: 0,
    description: 'sound effects',
    async run(client, message, args, cmd){
    max = soundeffect.length;
    random = Math.floor(Math.random() * max);
    plusone = random+1;
    let picked = soundeffect.slice(random,plusone);
    if ((cmd === 'se' ) || (cmd === 'soundeffect')) {
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    if (cooldown.has("max")) {
        if (message.author.id === client.config.ownerID){
            const connection = await message.member.voice.channel.join();

            const stream = connection.play(`./sound_effects/${picked}`, { filter: 'audioonly' });
            message.delete();
            stream.on('finish', () => {
                console.log(`done playing ${picked}`);
                stream.destroy();
                message.guild.me.voice.channel.leave();
            });
        }else {
            message.delete();
            return;
        }
    }else  {
        const connection = await message.member.voice.channel.join();

        const stream = connection.play(`./sound_effects/${picked}`, { filter: 'audioonly' });
        message.delete();
        stream.on('finish', () => {
            console.log(`done playing ${picked}`);
            stream.destroy();
            message.guild.me.voice.channel.leave();
        });
        cooldown.add("max");
        setTimeout(() => {
            cooldown.delete("max");
        }, 60000);
    }
}
    else if (cmd === "bruh"){
        if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
        if (cooldown.has("x")) {
            if (message.author.id === client.config.ownerID){
                const connection = await message.member.voice.channel .join();
    
                const stream = connection.play(`./sound_effects/tg_titouan.mp3`, { filter: 'audioonly' });
                message.delete();
                stream.on('finish', () => {
                    console.log(`done playing tg_titouan.mp3`);
                    stream.destroy();
                    message.guild.me.voice.channel.leave();
                });
            }else {
                message.delete();
                return;
            }
        }else  {
            const connection = await message.member.voice.channel.join();
    
            const stream = connection.play(`./sound_effects/tg_titouan.mp3`, { filter: 'audioonly' });
            message.delete();
            stream.on('finish', () => {
                console.log(`done playing tg_titouan.mp3`);
                stream.destroy();
                message.guild.me.voice.channel.leave();
            });
            cooldown.add("x");
            setTimeout(() => {
                cooldown.delete("x");
            }, 60000);
        }
    }
}
}
