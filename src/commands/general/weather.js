const { MessageEmbed } = require("discord.js");

fetch = require("node-fetch");
moment = require('moment');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    if (!args) {
        warningEmbed.setDescription(`**Hey <@${message.author.id}>! You need to provide a location!**`);
        message.channel.send(warningEmbed);
    } else {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e29863581f43f1857eefd2d38d6a1836`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        const response = await fetch(url, options);
        const getWeather = await response.json();

        var weatherEmbed = {
            color: 0xff0000,
            title: `${getWeather.name}, ${getWeather.sys.country}`,
            description: moment.unix(getWeather.dt).format('MMMM Do YYYY, h:mm A'),
            thumbnail: {
                url: `https://openweathermap.org/img/wn/${getWeather.weather[0].icon}@4x.png`,
            },
            fields: [
                {
                    name: 'Current Weather',
                    value: `${getWeather.weather[0].main}\n${getWeather.weather[0].description}`,
                },
                {
                    name: 'Current Temperature',
                    value: `${Math.round(getWeather.main.temp)}°C`,
                    inline: true,
                },
                {
                    name: 'Minimum Temperature',
                    value: `${getWeather.main.temp_min}°C`,
                    inline: true,
                },
                {
                    name: 'Maximum Temperature',
                    value: `${getWeather.main.temp_max}°C`,
                    inline: true,
                },
                {
                    name: 'Sunrise',
                    value: moment.unix(getWeather.sys.sunrise).format('h:mm A'),
                    inline: true,
                },
                {
                    name: 'Sunset',
                    value: moment.unix(getWeather.sys.sunset).format('h:mm A'),
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: 'Humidity',
                    value: getWeather.main.humidity,
                    inline: true,
                },
                {
                    name: 'Visibility',
                    value: `${Math.round(getWeather.visibility) / 1000}km`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
            ],
        };

        message.channel.startTyping();
        message.channel.send({
            embed: weatherEmbed
        }).catch(console.error);
        message.channel.stopTyping();

    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "weather",
    category: "General",
    description: "Shows the current weather",
    usage: "weather"
};