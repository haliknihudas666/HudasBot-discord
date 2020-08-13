fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    if (!message.mentions.users.size) {
        warningEmbed.setDescription(`**Hey <@${message.author.id}>, You need to tag a user to insult!**`);
        return message.channel.send(warningEmbed);
    } else {
        const taggedUser = message.mentions.users.first();

        const url = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        const res = await fetch(url, options);
        const json = await res.json();

        message.channel.startTyping();
        message.channel.send('Hey <@' + taggedUser.id + '>, ' + json.insult);
        message.channel.stopTyping();
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "insult",
    category: "Fun",
    description: "Hudas is here to insult you.",
    usage: "insult"
};