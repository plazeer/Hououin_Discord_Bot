exports.run = (client, message, args) => {

  let member = message.mentions.members.first();
  const ms = require("ms");
  let milliseconds = parseInt(args[1]);
  let mutereason = args.slice(2).join(" ");
  let seconds = milliseconds * 1000;
    if (!member) return message.channel.send("Mention a user!");
      if (message.member.hasPermission("MANAGE_ROLES")) {
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