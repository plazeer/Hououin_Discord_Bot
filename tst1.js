const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

//markov collector
client.on("message", function (message) {
  if (message.author.bot) return;
  if (message.content.startsWith('&')) return;
  const d = new Date()
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  const fs = require("fs");
  let word = message.content
  fs.appendFileSync('data.txt', word+"|");
  fs.appendFileSync('markovlog.txt', word+" | a été ajouté dans la base de données le "+d.toLocaleDateString('fr-FR')+" "+time+"\n");
});

client.on("message", function (message) {
  if (message.content.startsWith('&')) return;
  if (message.content.toLowerCase().endsWith("quoi") 
      || message.content.toLowerCase().endsWith("quoi ?") 
      || message.content.toLowerCase().endsWith("quoi ??") 
      || message.content.toLowerCase().endsWith("quoi ???") 
      || message.content.toLowerCase().endsWith("quoi?") 
      || message.content.toLowerCase().endsWith("quoi??")
      || message.content.toLowerCase().endsWith("quoi???")
      || message.content.toLowerCase().endsWith("pourquoi")
      || message.content.toLowerCase().endsWith("pourquoi?")
      || message.content.toLowerCase().endsWith("pourquoi ?"))
  message.channel.send("feur");
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
