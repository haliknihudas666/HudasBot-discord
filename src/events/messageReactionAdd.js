module.exports = async (client, reaction, user) => {
    if (user.bot) return;

    //Channel to watch for reactions
    var ruleschannel = reaction.client.channels.cache.find(channel => channel.name === 'rules-and-info');

    //Messages to watch for reactions
    var rulesReactEmbedMessage = "740129433288966234"
    var streamReactEmbedMessage = "740129477430083655";
    var nsfwReactEmbedMessage = "740137080490950668";

    //Roles to be given
    var verified = reaction.message.guild.roles.cache.find(r => r.name === 'Verified Apprentice');
    var streamalert = reaction.message.guild.roles.cache.find(r => r.name === 'Stream Fans');
    var nsfw = reaction.message.guild.roles.cache.find(r => r.name === 'NSFW');

    //Find the Member if it exist on the current Guild
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);

    if (reaction.message.channel.id === ruleschannel.id) {
        //Rules Embed
        if (reaction.message.id === rulesReactEmbedMessage) {
            if (reaction.emoji.name === '✅') {
                if (member.roles.cache.has(verified.id)) {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("✅");

                    user.send('You\'re already a verified apprentice of Hudas Inferno!').catch(console.error);
                } else {
                    member.roles.add(verified.id);
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("✅");
                    user.send('You\'re now a Verified Apprentice of Hudas Inferno Server').catch(console.error);
                }
            }
        }

        //Stream Alerts Embed
        if (reaction.message.id === streamReactEmbedMessage) {
            if (reaction.emoji.name === '📺') {
                if (member.roles.cache.has(verified.id) && member.roles.cache.has(streamalert.id)) {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("📺");
                    await reaction.message.react("❌");

                    user.send('You\'re already subscribed to Stream Alerts!').catch(console.error);
                } else if (member.roles.cache.has(verified.id)) {
                    member.roles.add(streamalert.id);
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("📺");
                    await reaction.message.react("❌");

                    user.send('You\'ve subscribed to Stream Alerts!').catch(console.error);
                } else {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("📺");
                    await reaction.message.react("❌");

                    user.send('You need to get verified first before subscribing to stream alerts!').catch(console.error);
                }
            } else if (reaction.emoji.name === '❌') {
                if (member.roles.cache.has(streamalert.id)) {
                    member.roles.remove(streamalert.id);
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("📺");
                    await reaction.message.react("❌");

                    user.send('You\'ve unsubscribed to Stream Alerts!').catch(console.error);
                } else {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("📺");
                    await reaction.message.react("❌");

                    user.send('You currently don\'t have Stream Alerts role to remove!').catch(console.error);
                }
            }
        }

        //NSFW Embed
        if (reaction.message.id === nsfwReactEmbedMessage) {
            if (reaction.emoji.name === '🍆') {
                if (member.roles.cache.has(verified.id) && member.roles.cache.has(nsfw.id)) {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("🍆");
                    await reaction.message.react("🔞");

                    user.send('You\'re already have an access to NSFW Channels!').catch(console.error);
                } else if (member.roles.cache.has(verified.id)) {
                    member.roles.add(nsfw.id);
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("🍆");
                    await reaction.message.react("🔞");

                    user.send('You\'ve gained access to NSFW Channels!').catch(console.error);
                } else {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("🍆");
                    await reaction.message.react("🔞");

                    user.send('You need to get verified first before getting nsfw role!').catch(console.error);
                }
            } else if (reaction.emoji.name === '🔞') {
                if (member.roles.cache.has(nsfw.id)) {
                    member.roles.remove(nsfw.id);
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("🍆");
                    await reaction.message.react("🔞");

                    user.send('You\'ve removed your access to NSFW Channels!').catch(console.error);
                } else {
                    await reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    await reaction.message.react("🍆");
                    await reaction.message.react("🔞");

                    user.send('You currently don\'t have NSFW role to remove!').catch(console.error);
                }
            }
        }
    }
}
