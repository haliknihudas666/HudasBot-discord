module.exports = async (client, user) => {
    if (user.bot) return;

    var role = reaction.message.guild.roles.cache.find(r => r.name === 'Verified Apprentice');
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    var sendtochannel = reaction.client.channels.cache.find(channel => channel.name === 'bot-spam');
    var ruleschannel = reaction.client.channels.cache.find(channel => channel.name === 'rules-and-info');

    if (reaction.message.channel.id === ruleschannel.id) {
        if (reaction.emoji.name === '✅') {
            if (member.roles.cache.has(role.id)) {
                sendtochannel.startTyping();
                sendtochannel.send('Hey <@' + member.id + '>, you already have a ' + role.name + ' role');
                sendtochannel.stopTyping();
            } else {
                member.roles.add(role.id).then(member => {
                    sendtochannel.startTyping();
                    sendtochannel.send('<@' + member.id + '> has been given a ' + role.name + ' role');
                    sendtochannel.stopTyping();
                })
            }
        }
    }

};