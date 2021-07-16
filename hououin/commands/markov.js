exports.run = (client, message, args) => {
//variable
const MarkovChain = require('purpl-markov-chain');
const fs = require('fs');
const chain = new MarkovChain();
//read the file and split the string at every |
file = fs.readFileSync('data.txt', 'utf8');
liste = file.split("|");
// for each string in "liste" it adds it to the chain data
liste.forEach(string => chain.update(`${string}`));
//generate the chain having 2 words minimum used from the strings
const msg = chain.generate({grams: 2})
//send the chain in the channel
message.channel.send(msg);
}