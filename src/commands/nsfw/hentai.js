const akaneko = require('akaneko');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var hentaiEmbed = {
        color: 0xff0000,
        title: "Here's your hentai",
        image: {
            url: akaneko.lewdNeko(),
        },
    };

    if (!message.channel.nsfw) {
        message.channel.send("This command can only be used in channels marked nsfw.");
        return;
    } else {
        message.channel.startTyping();
        message.channel.send({
            embed: hentaiEmbed
        }).catch(console.error);
        message.channel.stopTyping();
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "NSFW"
};

exports.help = {
    name: "hentai",
    category: "NSFW",
    description: "Send a random hentai image",
    usage: "hentai"
};