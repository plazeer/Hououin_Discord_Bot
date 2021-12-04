const cooldown = new Set();
exports.run = (client, message, args) => {
    const ms = require('ms');
    const member = message.author.id;
    const list = client.guilds.cache.get("584833650193858814");
    list.members.fetch()
    const M = list.members.cache.map(membre => membre.id);
    console.log(M);
    
    max = M.length;
    random = Math.floor(Math.random() * max);
    plusone = random+1;
    let picked = M.slice(random,plusone);
    
    if (cooldown.has(member)) {
        message.channel.send("attend bozo");
        message.delete();
    } 
    else 
    {
        message.channel.send("<@!"+picked+">");
        message.delete();
        cooldown.add(member);
        setTimeout(() => {
            cooldown.delete(member);
        }, 600000);
    }
}
