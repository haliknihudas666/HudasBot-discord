const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "ownerID": "",

  // Bot Admins, level 9 by default. Array of user ID strings.
  "admins": [],

  // Bot Support, level 8 by default. Array of user ID strings
  "support": [],

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  "token": "",

  permLevels: [{
    level: 0,
    name: "User",
    check: () => true
  },
  {
    level: 1,
    name: "NSFW",
    check: (message) => {
      try {
        var nsfwRole = message.guild.roles.cache.find(r => r.name === 'NSFW');
        if (message.member.roles.cache.has(nsfwRole.id)) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
  },
  {
    level: 2,
    name: "Streamer",
    check: (message) => {
      try {
        var streamerRole = message.guild.roles.cache.find(r => r.name === 'Streamer');
        if (message.member.roles.cache.has(streamerRole.id)) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
  },
  {
    level: 4,
    name: "Guardian of the Inferno",
    check: (message) => {
      try {
        var modRole = message.guild.roles.cache.find(r => r.name === 'Guardian of the Inferno');
        if (message.member.roles.cache.has(modRole.id)) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
  },
  {
    level: 5,
    name: "Administrator",
    check: (message) => {
      try {
        const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
        return (adminRole && message.member.roles.has(adminRole.id));
      } catch (e) {
        return false;
      }
    }
  },
  // This is the server owner.
  {
    level: 6,
    name: "Server Owner",
    // Simple check, if the guild owner id matches the message author's ID, then it will return true.
    // Otherwise it will return false.
    check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
  },

  // Bot Support is a special inbetween level that has the equivalent of server owner access
  // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
  {
    level: 8,
    name: "Bot Support",
    // The check is by reading if an ID is part of this array. Yes, this means you need to
    // change this and reboot the bot to add a support user. Make it better yourself!
    check: (message) => config.support.includes(message.author.id)
  },

  // Bot Admin has some limited access like rebooting the bot or reloading commands.
  {
    level: 9,
    name: "Bot Admin",
    check: (message) => config.admins.includes(message.author.id)
  },

  // This is the bot owner, this should be the highest permission level available.
  // The reason this should be the highest level is because of dangerous commands such as eval
  // or exec (if the owner has that).
  {
    level: 10,
    name: "Bot Owner",
    // Another simple check, compares the message author id to the one stored in the config file.
    check: (message) => message.client.config.ownerID === message.author.id
  }
  ]
};

module.exports = config;