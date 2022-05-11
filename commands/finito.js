exports.run = (client, message, args) => {
    ziney = ['https://imgur.com/dTA1Hla', 'https://imgur.com/YbKChFS', 'https://imgur.com/aTiItmE', 'https://cdn.discordapp.com/attachments/923240752602050581/931608669882318919/IMG_2024.jpg']
    max = ziney.length;
    random = Math.floor(Math.random() * max);
    plusone = random+1;
    let picked = ziney.slice(random,random+1);
    message.delete();
    message.channel.send(picked[0]);
}; 

