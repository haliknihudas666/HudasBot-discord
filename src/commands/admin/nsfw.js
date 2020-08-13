const nsfwEmbed = {
    color: 0x000000,
    fields: [{
        name: '**Are you 18 years old and above?\nAre you sure you want to see some Pussy and Dicks?**',
        value: '\nJust click the 🍆 to get access in NSFW channel!\nIf you want to remove your access to NSFW Channels you can click the 🔞 react.'
    },],
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send({
        embed: nsfwEmbed
    }).then(async message => {
        message.react("🍆");
        message.react("🔞");

    }).catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Owner"
};

exports.help = {
    name: "nsfw",
    category: "Admin",
    description: "Shows nsfw confimation embed",
    usage: "nsfw"
};