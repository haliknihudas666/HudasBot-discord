require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const Canvas = require('canvas');
fetch = require("node-fetch");
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./config/config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setActivity("Follow me on twitch!", {
		type: "STREAMING",
		url: "https://www.twitch.tv/haliknihudas666"
	})
});

client.on('messageReactionAdd', async (reaction, user) => {
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
});

client.on('message', async msg => {
	//Check if the message is sent by a bot
	if (!msg.content.startsWith(config.PREFIX) || msg.author.bot) return;

	//Remove any spaces from the command
	const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'hello') {
		msg.channel.send('Hi <@' + msg.author.id + '>! I\'m Hudas Bot at your service!\nIf you need help about my bot commands just type "h! commands"').catch(console.error);
	}


	const rulesEmbed = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle('Welcome to Hudas Fans Club! \nYou\'ve successfully found our lair!')
		.setThumbnail('https://nesperida911.github.io/assets/nico500px.png')
		.addFields({
			name: 'Hudas Fans Club Rules',
			value: '1. [Discord TOS](https://discord.com/terms) should be followed. \n' +
				'2. Bot Commands is only limited on #bot-test \n' +
				'3. No spamming any text channels. \n' +
				'4. No harassing other members. \n' +
				'5. NSFW Contents should only be sent on the NSFW Channels'
		})
		.setTimestamp();

	//dont forget to remove this command to avoid rules duplicates
	if (command === 'rules') {
		msg.channel.send(rulesEmbed).then(msg => {
			msg.react('✅');
		}).catch(console.error);
	}

	//join test
	if (command === 'join') {
		client.emit('guildMemberAdd', msg.member);
	}

	//join test
	if (command === 'leave') {
		client.emit('guildMemberRemove', msg.member);
	}

	const url = 'https://icanhazdadjoke.com/';
	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	};

	if (command === 'dadjoke') {
		const res = await fetch(url, options);
		const json = await res.json();
		console.log(json);

		msg.channel.send(json.joke);
	}

	if (command === 'swear') {
		if (!msg.mentions.users.size) {
			msg.channel.send('Hey <@' + msg.author.id + '>! You need to tag a user to swear!');
		} else {
			const taggedUser = msg.mentions.users.first();
			msg.channel.send('Tangina mo <@' + taggedUser.id + '>');
		}

	}
});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(1100, 500);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://nesperida911.github.io/assets/card-dark-bg.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '40px san-serif';
	// ctx.strokeStyle = 'black';
	// ctx.lineWidth = 1;
	// ctx.strokeText(member.user.tag + ' just joined the inferno!', canvas.width - 696, 350);
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = 'center';
	ctx.fillText(member.user.tag, canvas.width / 2, 380);
	ctx.fillText('Just joined the Inferno!', canvas.width / 2, 430);

	ctx.beginPath();
	ctx.arc(550, 190, 125, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
		format: 'png',
		size: 1024
	}));
	ctx.drawImage(avatar, 425, 65, 250, 250);

	ctx.beginPath();
	ctx.arc(550, 190, 125, 0, Math.PI * 2, true);
	ctx.strokeStyle = "#FF0000"
	ctx.lineWidth = 10;
	ctx.stroke();

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	var ruleschannel = channel.client.channels.cache.find(channel => channel.name === 'rules-and-info');
	channel.send(`Hello, ${member}! \nWelcome to Hudas Fans Club! \nPlease check <#${ruleschannel.id}> then click the :white_check_mark: to accept our rules! Enjoy!`, attachment).catch(console.error);
});

client.on('guildMemberRemove', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'farewell');
	if (!channel) return;

	const canvas = Canvas.createCanvas(1100, 500);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://nesperida911.github.io/assets/card-dark-bg.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '40px san-serif';
	// ctx.strokeStyle = 'black';
	// ctx.lineWidth = 1;
	// ctx.strokeText(member.user.tag + ' just joined the inferno!', canvas.width - 696, 350);
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = 'center';
	ctx.fillText(member.user.tag, canvas.width / 2, 380);
	ctx.fillText('Just left the Inferno!', canvas.width / 2, 430);

	ctx.beginPath();
	ctx.arc(550, 190, 125, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
		format: 'png',
		size: 1024
	}));
	ctx.drawImage(avatar, 425, 65, 250, 250);

	ctx.beginPath();
	ctx.arc(550, 190, 125, 0, Math.PI * 2, true);
	ctx.strokeStyle = "#FF0000"
	ctx.lineWidth = 10;
	ctx.stroke();

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	var ruleschannel = channel.client.channels.cache.find(channel => channel.name === 'rules-and-info');
	channel.send(`${member} just left the inferno 😭\nPlease comeback 🥺👉👈`, attachment).catch(console.error);
});


client.login(process.env.BOT_TOKEN);