exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    client.emit('guildMemberRemove', message.member);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "leave",
    category: "Debugging Tools",
    description: "",
    usage: "leave"
};