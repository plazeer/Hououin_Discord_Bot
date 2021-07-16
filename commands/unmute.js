exports.run = (client, message, args) => {

    let reason = args.slice(1).join(' ');
        if (message.member.hasPermission("MANAGE_ROLES")) {
        let member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(r => r.name === 'muted');
        if (!member.roles.cache.some(r => r.name === 'muted')) {
            message.channel.send("<@"+member+"> is not muted.");
        } else {
            member.roles.remove(role);
            message.channel.send("<@"+member+"> has been unmuted, reason : "+reason);
        };
    };

};