exports.run = (client, message, args) => {
    message.channel.send(`Latency is ${message.createdTimestamp - Date.now()}ms.`);
};