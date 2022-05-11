const { Permissions } = require('discord.js');
exports.run = (client, message, args) => {

    let reason = args.slice(1).join(' ');
        if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        let member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(r => r.name === 'muted');
        if (!member.roles.cache.some(r => r.name === 'muted')) {
            message.channel.send("<@"+member+"> eest pas mute");
        } else {
            member.roles.remove(role);
            message.channel.send("<@"+member+"> a été demute, reason : "+reason);
        };
    };

};