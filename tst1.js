const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MEMBERS, 
    Discord.Intents.FLAGS.GUILD_VOICE_STATES, 
    Discord.Intents.FLAGS.GUILD_MESSAGES, 
    Discord.Intents.FLAGS.DIRECT_MESSAGES, 
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, 
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS
  ]})
const config = require("./config.json");
client.config = config;

//markov collector
client.on("messageCreate", function (message) {
  //if (message.content.includes("@everyone") || message.content.includes("@here")) return;
  if (message.channel.id !== "923240752602050581") return;
  if (message.author.bot) return;
  if (message.content.startsWith('&')) return;
  if (message.content === "ratio.end") return;
  if (message.content === "markov.end") return;
  const d = new Date()
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  const fs = require("fs");
  let word = message.content
  fs.appendFileSync('data.txt', word+"|");
  fs.appendFileSync('markovlog.txt', word+" | a été ajouté dans la base de données le "+d.toLocaleDateString('fr-FR')+" "+time+"\n");
});

client.on("messageCreate", function (message) {
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

client.on("messageCreate", function (message) {
  if (message.content.startsWith('&')) return;
  if (message.content.toLowerCase().endsWith("ouge")) {
  message.channel.send("inak");
  message.channel.send("https://imgur.com/VJrti99");
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
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`loading commands : ${commandName}`);
    client.commands.set(commandName, props);
    if (props.aliases) {
      props.aliases.forEach(alias => {
          client.aliases.set(alias, props)
      })
  }
  });
});

client.login(config.token);
