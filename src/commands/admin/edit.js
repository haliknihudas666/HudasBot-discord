const rulesEmbed = {
    color: 0xff0000,
    title: 'Welcome to Hudas Fans Club! \nYou\'ve successfully found our lair!',
    thumbnail: {
        url: 'https://nesperida911.github.io/assets/nico500px.png',
    },
    fields: [{
        name: 'Hudas Fans Club Rules',
        value: '1. [Discord TOS](https://discord.com/terms) should be followed. \n' +
            '2. Bot Commands is only limited on #bot-spam\n' +
            '3. No spamming any text channels.\n' +
            '4. No harassing other members.\n' +
            '5. NSFW Contents should only be sent on the NSFW Channels\n\n' +
            '**Please click the ✅ to get verified and access the server**'
    },],
};

const streamEmbed = {
    color: 0x000000,
    fields: [{
        name: '**Do you want to get notified when i stream and my friends?**',
        value: '\nJust click the 📺 to get notified when we stream!\nIf you want to unsubscribe to stream mentions you can click the ❌ react.'
    },],
};

const nsfwEmbed = {
    color: 0x000000,
    fields: [{
        name: '**Are you 18 years old and above?\nAre you sure you want to see some Pussy and Dicks?**',
        value: '\nJust click the 🍆 to get access in NSFW channel!\nIf you want to remove your access to NSFW Channels you can click the 🔞 react.'
    },],
};



exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    //Stream Embed
    message.client.channels.fetch("736765023342428160").then(channel => {
        channel.messages.fetch("740129477430083655").then(message => {
            //message.react("❌");

            //message.edit({ embed: streamEmbed });
        })
    });

    //NSFW Embbed
    message.client.channels.fetch("736765023342428160").then(channel => {
        channel.messages.fetch("740137080490950668").then(async message => {
            await message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            await message.react("🍆");
            await message.react("🔞");

            message.edit({ embed: nsfwEmbed });
        })
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Owner"
};

exports.help = {
    name: "edit",
    category: "Admin",
    description: "Edit messages sent by a bot",
    usage: "edit"
};