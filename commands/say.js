exports.run = async (client, message, args) => {
    if (message.content.includes('@everyone') || message.content.includes('@here')) {
        message.delete();
        message.channel.send("ahahahahah t'esssayes de faire quoi mon reuf");
    }
    else {
        let phrase = args.join(" ");
        message.delete();
        await message.channel.send(phrase);
    };
};