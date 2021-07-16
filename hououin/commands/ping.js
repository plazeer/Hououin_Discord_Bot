exports.run = async (client, message, args) => {
    const msg = await message.channel.send("waiting.");
    msg.edit(`${msg.createdTimestamp - message.createdTimestamp}ms.`);
}