exports.run = async (client, message, args) => {
//variable
require('dotenv').config()
const translate = require('rita-deepl-translate-api');
const MarkovChain = require('purpl-markov-chain');
const fs = require('fs');
let language
const chain = new MarkovChain();
if (!args[0]) language = 'fr'
else language = args[0].toLowerCase()
//read the file and split the string at every |
file = await fs.readFileSync('data.txt', 'utf8');
liste = await file.split("|");
// for each string in "liste" it adds it to the chain data
liste.forEach(async string => await chain.update(`${string}`));
//generate the chain having 2 words minimum used from the strings
const msg = await chain.generate({grams: 2})
//send the chain in the channel
message.channel.startTyping();
setTimeout(() => {
    translate(msg, {to: language, apiKey: process.env.DEEPL_KEY})
                    .then(res => {
                        message.channel.send(res.text);
                    });
    message.channel.stopTyping();
    }, 1000);
}