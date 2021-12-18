exports.run = (client, message, args) => {
    message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms.`);
};