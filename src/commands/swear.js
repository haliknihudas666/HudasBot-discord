exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!message.mentions.users.size) {
        message.channel.send('Hey <@' + message.author.id + '>! You need to tag a user to swear!');
    } else {
        const taggedUser = message.mentions.users.first();
        var random = Math.floor(Math.random() * 6) + 1;

        switch (random) {
            case 1:
                message.channel.send('Tangina mo <@' + taggedUser.id + '>');
                break;
            case 2:
                message.channel.send('Gago ka <@' + taggedUser.id + '>');
                break;
            case 3:
                message.channel.send('Putangina mo <@' + taggedUser.id + '>');
                break;
            case 4:
                message.channel.send('Ulol ka <@' + taggedUser.id + '>');
                break;
            case 5:
                message.channel.send('Fuck you <@' + taggedUser.id + '>');
                break;
            case 6:
                message.channel.send('Cyka Bylat <@' + taggedUser.id + '>');
                break;
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "swear",
    category: "Miscelaneous",
    description: "Swear tagged users",
    usage: "swear"
};