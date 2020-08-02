client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;

    var role = reaction.message.guild.roles.cache.find(r => r.name === 'test');
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    var sendtochannel = reaction.client.channels.cache.find(channel => channel.name === 'tite-fans-club-general');
    var ruleschannel = reaction.client.channels.cache.find(channel => channel.name === 'bot-test');

    if (reaction.message.channel.id === ruleschannel.id) {
        if (reaction.emoji.name === '✅') {
            if (member.roles.cache.has(role.id)) {
                sendtochannel.send('Hey <@' + member.id + '>, you already have a ' + role.name + ' role');
            } else {
                member.roles.add(role.id).then(member => {
                    sendtochannel.send('<@' + member.id + '> has been given a ' + role.name + ' role');
                })
            }
        }
    }
});