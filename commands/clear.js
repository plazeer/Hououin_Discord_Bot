exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command.");
    if (!args[0]) return message.channel.send('pas de nombre');
    var nombre = args[0];
    var n = parseInt(nombre)+1;
    message.channel.bulkDelete(n, true)
    message.channel.send(nombre+" messages supprimés");
    setTimeout(() => {
        message.channel.bulkDelete(1, true)
    }, 1);

}