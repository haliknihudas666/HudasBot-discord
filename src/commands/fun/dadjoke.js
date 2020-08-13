fetch = require("node-fetch");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const url = 'https://icanhazdadjoke.com/';
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
    message.channel.send(json.joke);
    message.channel.stopTyping();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "dadjoke",
    category: "Fun",
    description: "Daddy Hudas is here again to throw some dad jokes.",
    usage: "dadjoke"
};