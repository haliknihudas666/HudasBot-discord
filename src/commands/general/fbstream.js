exports.run = async (client, message) => { // eslint-disable-line no-unused-vars

    const guild = client.guilds.cache.get('516653830176505879');
    if (message.guild.id != guild) {
        return message.channel.send(`This command is only for Hudas Inferno Discord Guild`);
    }
    var sendtochannel = guild.client.channels.cache.find(channel => channel.name === 'bot-test');
    //var sendtochannel = guild.client.channels.cache.find(channel => channel.name === 'streams');
    const streamfans = guild.roles.cache.find(role => role.name === 'Stream Fans');
    var streamer = message.author;

    const questions = ['Please enter your username\n\nYou can cancel stream announcement by sending "cancel"', 'What game are you playing?\nI have a list of games that i supported check it out by using `h!help fbstream`\n\nYou can cancel stream announcement by sending "cancel"', 'Do you want to use your own stream thumbnail?\nYou can send "default" to use the default thumbnail?\n\nYou can cancel stream announcement by sending "cancel"', 'Do you want to use a custom game icon?\nYou can send "skip" if you want to use the game default icon\n\nYou can cancel stream announcement by sending "cancel"'];

    const filter = m => message.author.id === m.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 120000 });

    const answers = [];
    const images = [];;
    await message.channel.send("Send image");
    var imageattach = await message.attachments;
    await console.log("Image Var: " + imageattach);

    await message.channel.send(questions[0]);
    collector.on('collect', msg => {
        answers.push(msg.content);
        questions.shift();
        if (msg.content.toLowerCase().includes('cancel')) return collector.stop('cancelled');
        if (questions.length <= 0) return collector.stop('done');
        if (questions[0] === 'Do you want to use your own stream thumbnail?\nYou can send "default" to use the default thumbnail?\n\nYou can cancel stream announcement by sending "cancel"') {
            console.log("matched");

            imageattach = msg.attachments;
            images.push(msg.attachments);
        }
        console.log("Image Var: " + imageattach);
        console.log("Image Push: " + images);
        message.channel.send(questions[0]).catch(error => {
            console.error(error);
            collector.stop();
        });
    });

    collector.on('end', (collected, reason) => {
        var username = answers[0];
        var game;
        var imgurl = images[0];
        var imggameurl;

        if (reason === 'done') {
            if (answers[1].toLowerCase() === 'valorant') {
                game = 'Valorant';
                imggameurl = 'https://nesperida911.github.io/assets/bot/valorant.png';
            } else if (answers[1].toLowerCase() === 'csgo') {
                game = 'CSGO';
                imggameurl = 'https://nesperida911.github.io/assets/bot/csgo.png';
            } else if (answers[1].toLowerCase() === 'minecraft' || answers[1].toLowerCase() === 'mc') {
                game = 'Minecraft';
                imggameurl = 'https://nesperida911.github.io/assets/bot/minecraft.png';
            } else if (answers[1].toLowerCase() === 'lol') {
                game = 'League of Legends';
                imggameurl = 'https://nesperida911.github.io/assets/bot/lol.png';
            } else if (answers[1].toLowerCase() === 'gtav' || answers[1].toLowerCase() === 'gta5') {
                game = 'Grand Theft Auto 5';
                imggameurl = 'https://nesperida911.github.io/assets/bot/gtav.png';
            } else if (answers[1].toLowerCase() === 'lor') {
                game = 'Legends of Runeterra';
                imggameurl = 'https://nesperida911.github.io/assets/bot/lor.png';
            } else if (answers[1].toLowerCase() === 'dota2') {
                game = 'DOTA 2';
                imggameurl = 'https://nesperida911.github.io/assets/bot/dota2.png';
            }
            // else if (answers[1].toLowerCase() === '') {
            //     game = '';
            //     imgurl = 'https://nesperida911.github.io/assets/bot/.png';
            // }

            //TODO CHECK IMAGE FORMAT
            if (answers[2].toLowerCase().includes('default')) {
                imgurl = 'https://nesperida911.github.io/assets/bot/fblive.png'
            } else {
                imgurl = images[0];
            }

            console.log(`Username: ${answers[0]}`);
            console.log(`Game: ${game}`);
            console.log(`Stream Thumbnail URL: ${imgurl}`);
            console.log(`Game Icon URL: ${imggameurl}`);

            var streamEmbed = {
                color: 0xff0000,
                title: '**' + streamer.username + '** just started streaming!\nCurrently playing ' + game + '\nGo check it out!',
                description: "https://fb.gg/" + username + "/live",
                thumbnail: {
                    url: imggameurl,
                },
                image: {
                    url: imgurl,
                },
            };


            sendtochannel.send('Hey <@&' + streamfans.id + '>,\n<@' + streamer + '> is now live!').then(message => message.channel.send({
                embed: streamEmbed
            })).catch(console.error);


        } else if (reason === 'cancelled') {
            message.channel.send(`You\'ve cancelled your stream announcement`);
        }
        else {
            message.channel.send(`There was an error processing your request`);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["fb"],
    permLevel: "Streamer"
};

exports.help = {
    name: "fbstream",
    category: "Streamer",
    description: "Create an Livestream Announcement in #streams",
    usage: "<required> [optional]\n" +
        "h!fbstream <username> <game> <stream thumbnail url or default> [game logo url]\n\n" +
        "Supported Games (in those with = is the command if you want to tag that game):\n" +
        "Valorant,\n" +
        "Minecraft or mc,\n" +
        "Counter Strike: Global Offensive = CSGO,\n" +
        "Grand Theft Auto 5 = GTAV/GTA5,\n" +
        "League of Legends = LOL,\n" +
        "Legends of Runterra = LOR\n\n" +
        "You can still use other games as long as no spaces or you can suggest it to the Bot Admin\n\n" +
        "Explanation:\n" +
        "h!fb <your FB page username> <game> <if you doesn't have a thumbnail link just use 'default' as argument> [Any image link must end with supported image format]"
};