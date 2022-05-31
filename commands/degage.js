const cooldown = new Set();
const humanizeduration = require("humanize-duration")

module.exports = {
    name: 'degage',
    aliases: ['dg'],
    cooldown: 0,
    description: 'motus/sutom/wordle',
    async run(client, message, args, cmd){
        let list = [];
        const member = message.author.id;
        const guild = client.guilds.cache.get(message.guild.id);
        guild.members.fetch().then((members) => {});
        let username = await guild.members.fetch(message.author.id)
        if (cooldown.has(member)) {
            message.channel.send("attend bozo");
            message.delete();
            return;
        } 
        cooldown.add(member);
        await message.guild.channels.cache.get(username.voice.channel.id).members.forEach((member) => {
            if (member.id === message.author.id) return;
            list.push(member);
        });
        if (!list[0]) return message.channel.send("Faut qu'il y ai des gens en vocal")
        disco(list[Math.floor(Math.random() * list.length)])
        setTimeout(() => {
            cooldown.delete(member);
        }, 86400000);
    }
}

async function disco (user){
    console.log("déconnecter ============================");
    console.log(user.user.username+" s'est fait déco")
    user.voice.disconnect();  //déco du vc
};