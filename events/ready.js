module.exports = (client) => {
    console.log("on");
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: '???',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/spinigotilla'
        }
    });
};