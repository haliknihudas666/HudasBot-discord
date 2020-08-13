const { RedditSimple } = require("reddit-simple");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    RedditSimple.RandomPost('darkjoke').then(async res => {
        var string = await JSON.stringify(res);
        var reddit = await JSON.parse(string);

        var title = reddit[0].data.title;
        var description = reddit[0].data.selftext;

        message.channel.startTyping();
        message.channel.send(title);
        message.channel.send(description);
        message.channel.stopTyping();
    }).catch(e => {
        console.log(e);
    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "darkjoke",
    category: "Fun",
    description: "I said dank not darkest.",
    usage: "darkjoke"
};