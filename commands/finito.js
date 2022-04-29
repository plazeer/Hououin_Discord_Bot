exports.run = (client, message, args) => {
    ziney = ['https://imgur.com/dTA1Hla', 'https://imgur.com/YbKChFS', 'https://imgur.com/aTiItmE', 'https://cdn.discordapp.com/attachments/923240752602050581/931608669882318919/IMG_2024.jpg']
    max = ziney.length;
    random = Math.floor(Math.random() * max);
    plusone = random+1;
    let picked = ziney.slice(random,plusone);
    message.delete();
    message.channel.startTyping();
    setTimeout(() => {
        message.channel.send(picked);
        message.channel.stopTyping();
        }, 500);
}; 

