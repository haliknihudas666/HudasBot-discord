exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const questions = ['Yes? What can i help you?'];

    const filter = m => message.author.id === m.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 30000 });

    const answers = [];

    await message.channel.send(questions[0]);
    collector.on('collect', msg => {
        answers.push(msg.content);
        questions.shift();
        if (questions.length <= 0) return collector.stop('done');
        message.channel.send(questions[0]).catch(error => {
            console.error(error);
            collector.stop();
        });
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'done') {
            if (answers[0].toLowerCase() === 'what is your purpose?') {
                message.channel.send("To serve", {
                    files: [
                        "././src/assets/bot.png"
                    ]
                });
            }
        } else {
            message.channel.send(`There was an error processing your request`);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "hudas",
    category: "Fun",
    description: "",
    usage: ""
};