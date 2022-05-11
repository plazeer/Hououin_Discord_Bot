const cooldown = new Set();
const fs = require('fs');
let soundeffect = [];
fs.readdir("./sound_effects/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        soundeffect.push(file);
    })
})
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
module.exports = {
    name: 'soundeffect',
    aliases: ['se', 'chinoix', 'feldup', 'fart', 'bingchilling'],
    cooldown: 0,
    description: 'sound effects',
    async run(client, message, args, cmd){
    max = soundeffect.length;
    random = Math.floor(Math.random() * max);
    let picked = soundeffect.slice(random,random+1);
    const player = createAudioPlayer();
    const connection = joinVoiceChannel({channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator})
    let resource = createAudioResource(`./sound_effects/${picked}`);
    if ((cmd === 'se' ) || (cmd === 'soundeffect')) {
    console.log("playing"+ picked)
    if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
    if (cooldown.has("max")) {
        if (message.author.id !== client.config.ownerID){
            message.delete();
            return;
        } else {
            message.delete();
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                    connection.destroy();
                    console.log("done playing "+picked);
            })
        }
    }else  {
        connection.subscribe(player);
        player.play(resource);
        player.on('idle', () => {
                connection.destroy();
                console.log("done playing "+picked);
            })
        cooldown.add("max");
        setTimeout(() => {
            cooldown.delete("max");
        }, 60000);

    }  
}   else if (cmd === "chinoix"){
        console.log("playing chinoix")
        if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
        resource = createAudioResource(`./sound_effects/chinoix.mp3`);
        if (cooldown.has("max")) {
            if (message.author.id !== client.config.ownerID){
                message.delete();
                return;
            } else {
                message.delete();
            connection.subscribe(player);
                player.play(resource);
                 player.on('idle', () => {
                        connection.destroy();
                        console.log("done playing feldup")
                })
            }
        }else  {
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                 connection.destroy();
                 console.log("done playing feldup")
                })
            cooldown.add("max");
            setTimeout(() => {
                cooldown.delete("max");
            }, 60000);
        }  
    }  else if (cmd === "feldup"){
        console.log("playing feldup")
        if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
        resource = createAudioResource(`./sound_effects/feldup.mp3`);
        if (cooldown.has("max")) {
            if (message.author.id !== client.config.ownerID){
                message.delete();
                return;
            } else {
                message.delete();
            connection.subscribe(player);
                player.play(resource);
                 player.on('idle', () => {
                        connection.destroy();
                        console.log("done playing chinoix")

                })
            }
        }else  {
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                 connection.destroy();
                 console.log("done playing chinoix")
                })
            cooldown.add("max");
            setTimeout(() => {
                cooldown.delete("max");
            }, 60000);
        }
    } else if (cmd === "fart"){
        console.log("playing fart")
        if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
        resource = createAudioResource(`./sound_effects/fart-with-extra-reverb.mp3`);
        if (cooldown.has("max")) {
            if (message.author.id !== client.config.ownerID){
                message.delete();
                return;
            } else {
                message.delete();
            connection.subscribe(player);
                player.play(resource);
                 player.on('idle', () => {
                        connection.destroy();
                        console.log("done playing fart-with-extra-reverb.mp3")

                })
            }
        }else  {
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                 connection.destroy();
                 console.log("done playing fart-with-extra-reverb.mp3")
                })
            cooldown.add("max");
            setTimeout(() => {
                cooldown.delete("max");
            }, 60000);
        }
    } else if (cmd === "bingchilling"){
        console.log("playing fart")
        if(!message.member.voice.channel) return message.channel.send("Pas dans un vc");
        resource = createAudioResource(`./sound_effects/bing-chilling-boom-john-xina.mp3`);
        if (cooldown.has("max")) {
            if (message.author.id !== client.config.ownerID){
                message.delete();
                return;
            } else {
                message.delete();
            connection.subscribe(player);
                player.play(resource);
                 player.on('idle', () => {
                        connection.destroy();
                        console.log("done playing bing-chilling-boom-john-xina.mp3")

                })
            }
        }else  {
            connection.subscribe(player);
            player.play(resource);
            player.on('idle', () => {
                 connection.destroy();
                 console.log("done bing-chilling-boom-john-xina.mp3")
                })
            cooldown.add("max");
            setTimeout(() => {
                cooldown.delete("max");
            }, 60000);
        }
    }
}
}
