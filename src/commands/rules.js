const rulesEmbed = {
    color: 0xff0000,
    title: 'Welcome to Hudas Fans Club! \nYou\'ve successfully found our lair!',
    thumbnail: {
        url: 'https://nesperida911.github.io/assets/nico500px.png',
    },
    fields: [{
        name: 'Hudas Fans Club Rules',
        value: '1. [Discord TOS](https://discord.com/terms) should be followed. \n' +
            '2. Bot Commands is only limited on #bot-test \n' +
            '3. No spamming any text channels. \n' +
            '4. No harassing other members. \n' +
            '5. NSFW Contents should only be sent on the NSFW Channels'
    }, ],
    timestamp: new Date(),
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send({
        embed: rulesEmbed
    }).then(message => {
        message.react('✅');
    }).catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Owner"
};

exports.help = {
    name: "rules",
    category: "Server",
    description: "Shows the server rules that need to accept by members",
    usage: "rules"
};