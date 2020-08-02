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
    console.log(json);

    message.channel.send(json.joke);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "dadjoke",
    category: "Miscelaneous",
    description: "Daddy Hudas is here again to throw some dad jokes.",
    usage: "dadjoke"
};