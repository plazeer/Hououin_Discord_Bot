exports.run = async (client, message, args) => {
    //if (message.author.id == 286463065824952322) return message.channel.send("ftg nolan connard")
    let phrase = args.join(" ");
    message.delete();
    await message.channel.send(phrase);
}