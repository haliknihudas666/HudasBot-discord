const rulesEmbed = {
    color: 0x000000,
    fields: [{
        name: '**Do you want to get notified when i stream and my friends?**',
        value: '\nJust click the 📺 to get notified when we stream!'
    },],
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send({
        embed: rulesEmbed
    }).then(message => {
        message.react('📺');
        message.react("❌");
    }).catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Owner"
};

exports.help = {
    name: "stream",
    category: "Admin",
    description: "Shows stream notify embed",
    usage: "stream"
};