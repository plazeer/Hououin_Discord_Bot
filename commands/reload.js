exports.run = (client, message, args ) => {
    if (message.author.id !== client.config.ownerID) return;
    if (!args) return message.channel.send('Met une commande a reload');
    let commandName = args[0];
    if (!client.commands.has(commandName)) return message.channel.send("La commande existe pas");
    delete require.cache[require.resolve(`./${commandName}.js`)];   
    client.commands.delete(commandName);
    let props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send(`${commandName} a été reload`)

}