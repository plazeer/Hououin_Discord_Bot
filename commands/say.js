exports.run = async (client, message, args) => {
    let phrase = args.join(" ");
    message.delete();
    await message.channel.send(phrase);
}