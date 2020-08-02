client.on('message', async msg => {
    const bangug = msg.guild.emojis.cache.find(emoji => emoji.name === 'bangug');
    const kissmephilip = msg.guild.emojis.cache.find(emoji => emoji.name === 'kissmephilip');
    const pogchamp = msg.guild.emojis.cache.find(emoji => emoji.name === 'PogChamp');
    try {
        await msg.react(bangug);
        await msg.react(kissmephilip);
        await msg.react(pogchamp);
    } catch (error) {
        console.error('One of the emojis failed to react.');
    }
});