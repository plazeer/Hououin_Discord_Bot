exports.run = (client, message, args ) => {
    
    if (!args) return message.channel.send('Provide a command to reload');
    let commandName = args[0];
    if (!client.commands.has(commandName)) return message.channel.send("This command doesn't exist");
    delete require.cache[require.resolve(`./${commandName}.js`)];   
    client.commands.delete(commandName);
    let props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send(`${commandName} has been reloaded`)

}