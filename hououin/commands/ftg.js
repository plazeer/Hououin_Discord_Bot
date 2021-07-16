exports.run = (client, message, args) => {
    const ms = require('ms');
    const cooldown = new Set();
    member = message.author.id;
if (cooldown.has(member)) {
    message.channel.send("spamo no")

} else {
       // NolanID = message.guild.members.fetch('286463065824952322');
        message.channel.send('<@'+member+'> ftg');
        cooldown.add(member);
        setTimeout(() => {
        cooldown.delete(member);
        }, 18000);
    }
    
 
}
