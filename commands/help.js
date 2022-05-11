exports.run = async (client, message, args) => {
  const { MessageEmbed } = require('discord.js');
  const embed = new MessageEmbed()
  .setTitle('Liste des commandes')
  .setURL('https://www.youtube.com/watch?v=drcdPSFRMw8')
  .setColor('#FF2D00')
  .setThumbnail('https://i.imgur.com/2jYkL9c.jpg')
  .setFooter('鳳凰院凶真', 'https://i.imgur.com/dTA1Hla.jpg')
  .addFields({
    name: "Prefix : &",
    value: '\u200b'
  }, {
    name: 'finito',
    value: 'yassine le goat',
  }, {
    name: 'ghost',
    value: "ghost ping quelqu'un du serveur ",
  }, {
    name: 'markov',
    value: 'Envoie un message fait avec une chaine de markov '
  }, {
    name: 'pick',
    value: "J'arrive pas à expliquer mais exemple d'utilisation : \n `&pick a,b,c / contexte` \n `,` pour separer les choix et `/` pour separer les choix et le contexte"
  }, {
    name: 'ping',
    value: "Renvoie le ping avec le serveur"
  }, {
    name: 'samuel',
    value: "A envoyer si le message au dessus du votre est dangereusement `mensonger`"
  }, {
    name: 'say',
  value: "Le bot envoie le contenu du message que vous avez ecrit et supprime le votre, exemple : \n `&say hououin t'es qu'un gros con`\nce message va etre supprimé et le bot va envoyer : \n `hououin t'es qu'un gros con`"
  }, {
    name: 'pfp',
  value: "Envoie la photo de profile de l'utilisateur mentionné"
  }, {
    name: 'tg',
    value: "Attention... &tg `mention` `phrase`"
  }, {
    name: 'fart',
    value: "prout"
  }, {
    name: 'soundeffect',
    value: "fait un bruit"
  }, {
    name: 'bingchilling',
    value: "bing chilling!!!"
  }, {
    name: 'amq',
    value: "amq?"
  }, {
    name: 'id',
    value: "envoie l'id de la personne mentionné"
  }, {
    name: 'merci',
    value: "GREEN MONTANA GOAT, omg rush master 300lp ce soir en légende ?"
  }, {
    name: 'roulette, gacha, g',
    value: "la roulette, le gacha tout ce qu'il ya de plus classique"
  }, {
    name: 'soundeffect, se',
    value: "Fait un sound effect dans le vocal"
  }, {
    name: 'ben',
    value: "pose une question a ben, &ben `question`"
  }
  )
  .setTimestamp();

message.channel.send({ embeds: [embed] });
}