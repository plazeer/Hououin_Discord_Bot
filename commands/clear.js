const { Permissions } = require('discord.js');
exports.run = async (client, message, args) => {
    var nombre = args[0];
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("Pas les perms.");
    if (isNaN(nombre)) return message.channel.send('pas de nombre');
    var n = parseInt(nombre)+1;
    if (n > 100) return message.channel.send('100 max')
    message.channel.bulkDelete(n, true)
    message.channel.send(nombre+" messages supprimés");
    setTimeout(() => {
        message.channel.bulkDelete(1, true)
    }, 1);

}