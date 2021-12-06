exports.run = (client, message, args) => {

    let total = args.slice(0).join(' ').split(" /");
    let choice = total.slice(0, 1).join(' ').split(",");
    max = choice.length;
    if (max <= 1) return message.channel.send("`&pick a,b,c / contexte` \n `,` pour separer les choix et `/` pour separer les choix et le contexte");
    let reason = total[1];
    if (!reason) {
        let reason = " ";
    random = Math.floor(Math.random() * max);
    message.channel.send(choice[random]+""+reason);
    } else {
    random = Math.floor(Math.random() * max);
    message.channel.send(choice[random]+""+reason);
    }
}   