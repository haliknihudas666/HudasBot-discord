const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    if (!message.mentions.users.size) {
        warningEmbed.setDescription(`**Hey <@${message.author.id}>, You need to tag a user to swear!**`);
        return message.channel.send(warningEmbed);
    } else {
        const taggedUser = message.mentions.users.first();
        var random = Math.floor(Math.random() * 6) + 1;

        message.channel.startTyping();
        switch (random) {
            case 1:
                message.channel.send('Tangina mo <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
            case 2:
                message.channel.send('Gago ka <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
            case 3:
                message.channel.send('Putangina mo <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
            case 4:
                message.channel.send('Ulol ka <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
            case 5:
                message.channel.send('Fuck you <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
            case 6:
                message.channel.send('Cyka Bylat <@' + taggedUser.id + '>');
                message.channel.stopTyping();
                break;
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "swear",
    category: "Fun",
    description: "Swear tagged users",
    usage: "swear <@user>"
};