exports.run = async (client, message, args) => {
    const fs = require("fs");
    tab = [];
    fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandName = file.split(".")[0];
      tab.push(`${commandName}`);
        });
    message.channel.send(tab);
  });
}