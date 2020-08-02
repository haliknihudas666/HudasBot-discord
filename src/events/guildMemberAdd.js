const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  if (!channel) return;

  const canvas = Canvas.createCanvas(1100, 500);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('https://nesperida911.github.io/assets/card-dark-bg.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  //ctx.font = '40px Comic Sans MS';
  ctx.font = '40px Arial';
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
};