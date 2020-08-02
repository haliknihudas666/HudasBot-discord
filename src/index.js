// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const {
  promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const path = require("path");
const {
  readdirSync
} = require("fs");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({
  name: "settings"
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


// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdirSync(path.resolve(__dirname, "./commands/"));
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdirSync(path.resolve(__dirname, "./events/"));
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

  // End top-level async/await function.
};

init();