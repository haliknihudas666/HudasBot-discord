require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config/config.json');
const fs = require('fs');
const path = require("path");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, "./commands")).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setActivity("Follow me on twitch!", {
		type: "STREAMING",
		url: "https://www.twitch.tv/haliknihudas666"
	})
});

client.login(process.env.BOT_TOKEN);