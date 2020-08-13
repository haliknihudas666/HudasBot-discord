const { RedditSimple } = require("reddit-simple");
const { MessageEmbed } = require("discord.js");
fetch = require("node-fetch");

exports.run = async (client, message, [sub, args, time], level) => { // eslint-disable-line no-unused-vars
    var warningEmbed = new MessageEmbed();
    warningEmbed.setColor('#d9534f');

    var postBank = [];
    var timed;

    if (!sub) {
        warningEmbed.setDescription(`**Hey <@${message.author.id}>, You need to provide a subreddit\nCheck \`h!help reddit\` for more info**`);
        return message.channel.send(warningEmbed);
    }
    if (args === "timed" && message.guild.ownerID === message.author.id) {

        warningEmbed.setDescription(`**Timed post has been activated. New random post from /r/${sub} every ${time} minute(s).**`);
        warningEmbed.setColor('#5cb85c');
        message.channel.send(warningEmbed);

        timed = setInterval(() => {
            client.logger.log("[REDDIT] Sent a timed message");
            RedditSimple.RandomPost(sub).then(async res => {
                var string = await JSON.stringify(res);
                var reddit = await JSON.parse(string);

                var subreddit = reddit[0].data.subreddit;
                var title = reddit[0].data.title;
                var author = reddit[0].data.author;
                var permalink = reddit[0].data.permalink;
                var url = reddit[0].data.url;
                var over18 = reddit[0].data.over_18;


                //Tries to avoid duplicate
                if (postBank.includes(permalink)) {
                    RedditSimple.RandomPost(sub).then(async res => {
                        var string = await JSON.stringify(res);
                        var reddit = await JSON.parse(string);

                        var subreddit = reddit[0].data.subreddit;
                        var title = reddit[0].data.title;
                        var author = reddit[0].data.author;
                        var permalink = reddit[0].data.permalink;
                        var url = reddit[0].data.url;
                        var over18 = reddit[0].data.over_18;
                        postBank.push(permalink);

                        var subredditEmbed = {
                            color: 0xff5700,
                            author: {
                                name: `r/${subreddit}`,
                                icon_url: 'https://lh3.googleusercontent.com/proxy/S4HR1U1aYIlQw-oC_A-s75igsrKDGHsfVHzGdrZrZTbwwmJXJP-7ZZjna4q5rZRXVZqHfPAlK3QQlmEN-kcX-99mkDmLWKZGu5BsHnbPQkNvgs9xRnM',
                                url: `https://www.reddit.com/${subreddit}`,
                            },
                            title: `${author} says "${title}"`,
                            url: `https://www.reddit.com${permalink}`,
                            image: {
                                url: url,
                            },
                        };

                        if (over18 && !message.channel.nsfw) {
                            warningEmbed.setDescription(`**Hey this is NSFW Subreddit and this can only be used in channels marked nsfw.**`);
                            message.channel.send(warningEmbed);
                        } else {
                            message.channel.startTyping();
                            message.channel.send({
                                embed: subredditEmbed
                            }).catch(console.error);
                            message.channel.stopTyping();
                        }

                    }).catch(e => {
                        console.log(e);
                    });
                } else {
                    postBank.push(permalink);

                    var subredditEmbed = {
                        color: 0xff5700,
                        author: {
                            name: `r/${subreddit}`,
                            icon_url: 'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo.png',
                            url: `https://www.reddit.com/${subreddit}`,
                        },
                        title: `${author} says "${title}"`,
                        url: `https://www.reddit.com${permalink}`,
                        image: {
                            url: url,
                        },
                    };

                    if (over18 && !message.channel.nsfw) {
                        warningEmbed.setDescription(`**Hey this is NSFW Subreddit and this can only be used in channels marked nsfw.**`);
                        message.channel.send(warningEmbed);

                    } else {
                        message.channel.startTyping();
                        message.channel.send({
                            embed: subredditEmbed
                        }).catch(console.error);
                        message.channel.stopTyping();
                    }
                }
            }).catch(e => {
                console.log(e);
            });

        }, time * 60000);
    } else if (args === "timed") {
        warningEmbed.setDescription(`**Only server admin can set this timed message.**`);
        message.channel.send(warningEmbed);
    } else if (args === "cancel" && message.guild.ownerID === message.author.id) {
        warningEmbed.setDescription(`**Timed random post has been cancelled.**`);
        message.channel.send(warningEmbed);
        clearInterval(timed);
        timed = undefined;
    } else {
        const url = `https://www.reddit.com/r/${sub}/.json`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (json.error === 403) {
            warningEmbed.setDescription(`**It looks like this is an private or invite only subreddit.**`);
            return message.channel.send(warningEmbed);
        } else if (json.data.dist === 0) {
            warningEmbed.setDescription(`**This subreddit you're looking for doesn't exist. Do i exist?**`);
            return message.channel.send(warningEmbed);
        } else {
            RedditSimple.RandomPost(sub).then(async res => {
                var string = await JSON.stringify(res);
                var reddit = await JSON.parse(string);

                var subreddit = reddit[0].data.subreddit;
                var title = reddit[0].data.title;
                var author = reddit[0].data.author;
                var permalink = reddit[0].data.permalink;
                var url = reddit[0].data.url;
                var over18 = reddit[0].data.over_18;
                var is_Video = reddit[0].data.is_video;

                var subredditEmbed = {
                    color: 0xff0000,
                    author: {
                        name: `r/${subreddit}`,
                        icon_url: 'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo.png',
                        url: `https://www.reddit.com/${subreddit}`,
                    },
                    title: `${author} says "${title}"`,
                    url: `https://www.reddit.com${permalink}`,
                    image: {
                        url: url,
                    },
                };

                if (over18 && !message.channel.nsfw) {
                    warningEmbed.setDescription(`**Hey this is NSFW Subreddit and this can only be used in channels marked nsfw.**`);
                    message.channel.send(warningEmbed);
                } else if (is_Video === true) {
                    warningEmbed.setDescription(`**I think this is a video and i don't support it at the moment. You can request again.**`);
                    message.channel.send(warningEmbed);
                } else {
                    message.channel.startTyping();
                    message.channel.send({
                        embed: subredditEmbed
                    }).catch(console.error);
                    message.channel.stopTyping();
                }

            }).catch(e => {
                console.log(e);
            });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "reddit",
    category: "General",
    description: "Send a random post from a subreddit",
    usage: "h!reddit <subreddit>\nServer admin can set a timer to make bot send a scheduled message every minute\nFor Server Admin\nh!gonewild <subreddit> timed <minutes>"
};