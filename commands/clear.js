exports.run = async (client, message, args) => {
    var nombre = args[0];
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Pas les perms.");
    if (isNaN(nombre)) return message.channel.send('pas de nombre');
    var n = parseInt(nombre)+1;
    message.channel.bulkDelete(n, true)
    message.channel.send(nombre+" messages supprimés");
    setTimeout(() => {
        message.channel.bulkDelete(1, true)
    }, 1);

}