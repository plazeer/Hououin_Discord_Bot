const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

client.on("message", (message) => {
  if (message.content.endsWith("quoi") 
  || message.content.endsWith("quoi ?") 
  || message.content.endsWith("quoi ??") 
  || message.content.endsWith("quoi ???") 
  || message.content.endsWith("quoi ????") 
  || message.content.endsWith("quoi?") 
  || message.content.endsWith("quoi??")
  || message.content.endsWith("quoi???")
  || message.content.endsWith("quoi????")) {
    message.channel.send("feur");
  }
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`loading events : ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`loading commands : ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
