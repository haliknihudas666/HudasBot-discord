if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const path = require("path");
const { readdirSync } = require("fs");

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.config = require("./config.js");
client.logger = require("./modules/Logger");

require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({
  name: "settings"
});

const init = async () => {

  const cmdFiles = await readdirSync(path.resolve(__dirname, "./commands/admin/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${cmdFiles.length} admin commands.`, "log");
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadAdmin(f);
    if (response) console.log(response);
  });

  const fun = await readdirSync(path.resolve(__dirname, "./commands/fun/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${fun.length} fun commands.`, "log");
  fun.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadFun(f);
    if (response) console.log(response);
  });

  const general = await readdirSync(path.resolve(__dirname, "./commands/general/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${general.length} general commands.`, "log");
  general.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadGeneral(f);
    if (response) console.log(response);
  });

  const misc = await readdirSync(path.resolve(__dirname, "./commands/misc/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${misc.length} misc commands.`, "log");
  misc.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadMisc(f);
    if (response) console.log(response);
  });

  const moderation = await readdirSync(path.resolve(__dirname, "./commands/moderation/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${moderation.length} moderation commands.`, "log");
  moderation.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadModeration(f);
    if (response) console.log(response);
  });

  const nsfw = await readdirSync(path.resolve(__dirname, "./commands/nsfw/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${nsfw.length} nsfw commands.`, "log");
  nsfw.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadNsfw(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdirSync(path.resolve(__dirname, "./events/"));
  console.log('\n');
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);
};

init();