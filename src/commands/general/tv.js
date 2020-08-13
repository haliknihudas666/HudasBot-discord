fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    var search = args.join(" ");
    if (!search) {
        warningEmbed.setDescription(`**Hey <@${message.author.id}>, You need to provide tv series title search query!**`);
        return message.channel.send(warningEmbed);
    } else {
        const url = `http://api.tvmaze.com/singlesearch/shows?q=${search}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        const res = await fetch(url, options);
        const series = await res.json();

        var summary = series.summary.replace(/<(.|\n)*?>/g, '');

        var tvEmbed = {
            color: 0xff0000,
            title: series.name,
            description: summary,
            fields: [
                {
                    name: 'Premiered',
                    value: series.premiered,
                    inline: true,
                },
                {
                    name: 'Status',
                    value: series.status,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: 'Ratings',
                    value: series.rating.average,
                    inline: true,
                },
                {
                    name: 'Languages',
                    value: series.language,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: 'Genre',
                    value: series.genres,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
            ],
            image: {
                url: series.image.original,
            },
            footer: {
                text: 'Data from TVMaze (www.tvmaze.com)',
                icon_url: 'http://static.tvmaze.com/images/favico/favicon-192x192.png',
            },
        };

        message.channel.startTyping();
        message.channel.send({
            embed: tvEmbed
        }).catch(console.error);
        message.channel.stopTyping();
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "tv",
    category: "General",
    description: "Find TV Series",
    usage: "tv"
};