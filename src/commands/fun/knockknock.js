fetch = require("node-fetch");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const url = 'https://official-joke-api.appspot.com/jokes/knock-knock/random';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    const res = await fetch(url, options);
    const json = await res.json();

    message.channel.startTyping();
    message.channel.send(json[0].setup);
    message.channel.send(json[0].punchline);
    message.channel.stopTyping();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "knockknock",
    category: "Fun",
    description: "Ah yes the classic knock knock.",
    usage: "knockknock"
};