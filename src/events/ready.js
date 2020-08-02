module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve Hudas Fans Club server`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity("Follow me on twitch!", {
    type: "STREAMING",
    url: "https://www.twitch.tv/haliknihudas666"
  })
};