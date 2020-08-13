fetch = require("node-fetch");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const url = 'https://api.adviceslip.com/advice';
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
    message.channel.send(json.slip.advice);
    message.channel.stopTyping();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "advice",
    category: "Fun",
    description: "Life Coach Hudas is here to give you some life advices.",
    usage: "advice"
};