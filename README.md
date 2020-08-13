# Hudas Bot

This bot is a fork of [AnIdiotGuide's guidebot](https://github.com/AnIdiotsGuide/guidebot)

You can join on my Discord Server to take a look on Hudas Bot Commands and Events
[![Discord chat][discord-badge]][discord-url]

[discord-badge]: https://img.shields.io/discord/516653830176505879?label=Hudas%20Inferno&logo=discord&style=for-the-badge
[discord-url]: http://discord.com/invite/cjnyv8q



## Setting Up

Prepare your bot token from [Discord Developers Portal](https://discord.com/developers/applications)

Make sure that you already enabled Developer Mode in your discord settings.
It can be found under Appearance => Advanced => Developer Mode

NPM

```bash
npm install
npm run start
```

If you want this bot to run on Heroku there is already an included Profile you just need to remove the "postinstall": "node src/setup.js" from package.json and manually enter your credentials in src/config.js
