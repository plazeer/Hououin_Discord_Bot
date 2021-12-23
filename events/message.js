//message event pour les commandes
module.exports = (client, message) => {
    if (message.author.bot) return;
  
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    const command = client.commands.get(cmd) || client.commands.find(a => a.alisases && a.aliases.includes(cmd))
    
    if(command) command.run(client, message, args, cmd);
};