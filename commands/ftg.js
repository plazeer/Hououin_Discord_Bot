exports.run = (client, message, args) => {
    const ms = require('ms');
    const cooldown = new Set();
    member = message.author.id;
if (cooldown.has(message.author.id)) {
    message.channel.send("spamo no");
}
else {
    message.channel.send('<@'+member+'> ftg');
    };
        // NolanID = message.guild.members.fetch('286463065824952322');
        cooldown.add(message.author.id);
        setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 180000);
};
