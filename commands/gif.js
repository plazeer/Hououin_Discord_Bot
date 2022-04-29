exports.run = async (client, message, args) => {
    const fs = require("fs");
    message.delete();
    if (message.mentions.members.first()) {
        user = message.mentions.members.first();
        let arr = args[0].split(/(?!$)/u);
        if (arr.length > 7) return;
        message.channel.send("<@"+user+">")
        arr.forEach(string => {
            message.channel.send({
                files: [`./letters/${string}.gif`]
            });
        });
    } else if (!isNaN(args[1])) {
        let arr = args[0].split(/(?!$)/u);
        if (arr.length > 7) return;
        message.channel.send("<@"+args[1]+">")
        arr.forEach(string => {
            message.channel.send({
                files: [`./letters/${string}.gif`]
            });
        });
    } else if (!(args[0])) {
        message.channel.send("&gif mot + mention")
    } else {
        let arr = args[0].split(/(?!$)/u);
        if (arr.length > 7) return;
        arr.forEach(string => {
            message.channel.send({
                files: [`./letters/${string}.gif`]
            });
        });
    }
};