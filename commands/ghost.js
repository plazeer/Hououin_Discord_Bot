const cooldown = new Set();
exports.run = (client, message, args) => {
    const member = message.author.id;
    const list = client.guilds.cache.get("584833650193858814");
    list.members.fetch()
    const M = list.members.cache.map(membre => membre.id);    
    max = M.length;
    random = Math.floor(Math.random() * max);
    let picked = M.slice(random,random+1);
    
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
            message.channel.bulkDelete(1, true)
        }, 1);
        setTimeout(() => {
            cooldown.delete(member);
        }, 600000);
    }
}
