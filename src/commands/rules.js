const rulesEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Welcome to Hudas Fans Club! \nYou\'ve successfully found our lair!')
    .setThumbnail('https://nesperida911.github.io/assets/nico500px.png')
    .addFields({
        name: 'Hudas Fans Club Rules',
        value: '1. [Discord TOS](https://discord.com/terms) should be followed. \n' +
            '2. Bot Commands is only limited on #bot-test \n' +
            '3. No spamming any text channels. \n' +
            '4. No harassing other members. \n' +
            '5. NSFW Contents should only be sent on the NSFW Channels'
    })
    .setTimestamp();

//dont forget to remove this command to avoid rules duplicates
if (command === 'rules') {
    msg.channel.send(rulesEmbed).then(msg => {
        msg.react('✅');
    }).catch(console.error);
}