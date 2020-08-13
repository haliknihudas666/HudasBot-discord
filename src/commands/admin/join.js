exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    client.emit('guildMemberAdd', message.member);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "join",
    category: "Debugging Tools",
    description: "Test the Welcome Card",
    usage: "join"
};