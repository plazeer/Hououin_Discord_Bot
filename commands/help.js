const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js');

exports.run = async (client, message, args) => {
var image = client.guilds.resolve(message.guild.id).members.resolve(message.author.id).user.displayAvatarURL({size : 2048, dynamic : true})
let start = 0;
let page =1;
let max = arr.length
let maxpage = (max+1)/5
let page1 = await message.channel.send({ embeds: [await page_embed(start, max+1, arr, image, page)], components: [buttons]});
const collector2 = page1.createMessageComponentCollector({ time: 60000 });
                    collector2.on('collect', async i => {
                        if (i.customId === 'forward') {
                            start +=5;
                            page +=1
                            if (page > maxpage) page = 1;
                            if (start > max+1) start = 0;
                            await i.update({ embeds: [await page_embed(start, max, arr, image, page)], components: [buttons]});
                        }
                        if (i.customId === 'back') {
                            start -=5;
                            page -=1
                            if (page < 0) page = maxpage;
                            if (start < -5) start = 5;
                            await i.update({ embeds: [await page_embed(start, max, arr, image, page)], components: [buttons]});
                        }
                    })
                  }
const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY'),
)
.addComponents(
    new MessageButton()
        .setCustomId('forward')
        .setLabel('➡')
        .setStyle('SECONDARY'), 
);

async function page_embed (start, end, std, image, page) {
  if (start === end || start > end ) start = 0;
  if (start < 0) start = 10;
  if (page === 0) page = 5;
  let current = std.slice(start, start+5);
  return new MessageEmbed()
      .setTitle(`Liste des commandes, page ${page}`)
      .setURL('https://www.youtube.com/watch?v=drcdPSFRMw8')
      .setDescription('Prefix : &')
      .setColor('#FF2D00')
     .setThumbnail('https://i.imgur.com/2jYkL9c.jpg')
      .setFooter({ text: '\u200B', iconURL: image })
      .setTimestamp()
      .addFields(current);
}

let arr = [{
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
}, {
  name: 'shifumi',
  value: "un shifumi, faut ping le joueur contre qui on joue"
}, {
  name: 'driver',
  value: "Montre le profil  de la saison actuelle du pilote selectionné"
}, {
  name: 'standing',
  value: "standing(+ année si vous voulez une année en particulier) Montre le standing des constructeurs ou des pilotes de la saison"
}, {
  name: 'wordle',
  value: "un wordle"
}, {
  name: 'tl',
  value: "Traduit le message cité ou le texte apres le message"
}, {
  name: 'gif',
  value: "Envoie le mot après la commande en lettre gif qui danse"
}]