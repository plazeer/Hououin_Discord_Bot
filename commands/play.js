const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../events/message');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'leave'],
    cooldown: 0,
    description: 'Advanced music bot',
    async run(client, message, args, cmd){
        //les permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('pas dans un vc ');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('pas les droits');
        if (!permissions.has('SPEAK')) return message.channel.send('pas les droits');

        //la queue du serveur
        const server_queue = queue.get(message.guild.id);

        //si la commande utilisé est play :
        if (cmd === 'play'){
            if (!args.length) return message.channel.send('&play url');
            let song = {};

            //si le liens est un url il a deux valeurs titre et url
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //si il n'y a pas d'url il utilise la lib ytb search et prend le premier resultat
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('erreur dans la rechercher de video');
                }
            }

            //si la quueue n'existe pas créeer un constructeur 
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //ajoute une paire d'id du serv et d'une valeur dans la queue dans globale 
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //lance un son avec la fonction video_player
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('erreur dans la connexion');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`**${song.title}** ajouté`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'leave') stop_song(message, server_queue);
    }
}


//fonction qui sert a jouer les videos :
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //si il n'y a plus de son dans la q : quitte le channel et supprime la paire d'id
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    //on créer le stream et quad un son se finit on l'enleve de la queue et on lance celui qui prend sa place 
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 1 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`**${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('pas dans un channel');
    if(!server_queue){
        return message.channel.send(`pas de sons dans la queue`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('pas dans un channel');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}