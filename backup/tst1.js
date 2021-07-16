const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const ms = require("ms");
const fs = require("fs");
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, event));
  });
});

client.commands = new Discord.collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    conole.log(`Attempting to load a command ${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.on("ready", () => {
  console.log("On");
});
//if (message.content.startsWith(config.prefix + "ping")) {
//  message.channel.send("pong!");
// if(message.author.id !== config.ownerID) return;
client.on("message", (message) => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  if (message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "ping") {
    message.channel.send("pong");
  }
  if (command == "mute") {
    let milliseconds = parseInt(args[1]);
    let mutereason = args.slice(2).join(" ");
    let seconds = milliseconds * 1000;
    if (message.member.hasPermission("MANAGE_ROLES")) {
      let member = message.mentions.members.first();
      let role = message.guild.roles.cache.find(r => r.name === 'muted');
      member.roles.add(role);
      if (message.content.includes (milliseconds+"s")) {
        message.channel.send( "<@"+member+"> has been muted for "+ ms(seconds)+", reason: "+mutereason);
      setTimeout(function() {
        member.roles.remove(role);
      }, seconds);
    }
      if (message.content.includes (milliseconds+"m")) {
        let minute = milliseconds * 60000;
        message.channel.send( "<@"+member+"> has been muted for "+ ms(minute)+", reason: "+mutereason);
      setTimeout(function() {
        member.roles.remove(role);
      }, minute);
    }
      if (message.content.includes (milliseconds+"h")) {
        let hour = milliseconds * 3600000;
        message.channel.send( "<@"+member+"> has been muted for "+ ms(hour)+", reason: "+mutereason);
      setTimeout(function() {
        member.roles.remove(role);
      }, hour);
    }
      if (message.content.includes (milliseconds+"d")) {
        let day = milliseconds * 3600000 * 24;
        message.channel.send( "<@"+member+"> has been muted for "+ ms(day)+", reason: "+mutereason);
      setTimeout(function() {
        member.roles.remove(role);
      }, day);
    }
      if (!message.content.includes (milliseconds)) {
        let mutereason = args.slice(1).join(" ");
        message.channel.send("<@"+member+"> has been muted, reason: "+mutereason);
    }
  } else {
    message.channel.send("You don't have permissions to use the mute command.")
  }
}
});

  client.login(config.token);