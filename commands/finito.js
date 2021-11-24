exports.run = (client, message, args) => {
    ziney = ['https://imgur.com/dTA1Hla', 'https://imgur.com/YbKChFS', 'https://imgur.com/aTiItmE']
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

