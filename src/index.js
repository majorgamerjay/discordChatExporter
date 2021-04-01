/* This application was created by MajorGamerJay <majorgamerjay@protonmail.com>
 * under the MIT License */
// Major thanks to Crystal and Mishti who solved the rate limit problem for me

const Discord = require('discord.js');
const fs = require('fs');

const Bot = new Discord.Client();
const config = require('./config.json');

const channelId = config.channelID;
const messageHistory = new Array();

let recursionMeter = 0;

class AuthorStructure {
		constructor(message) {
				this.name = `${message.author.username}#${message.author.discriminator}`;
				this.avatar = message.author.displayAvatarURL();
		}
}

class MessageStructure {
		constructor(message) {
				this.author = new AuthorStructure(message);
				this.content = message.content;

				this.time = new Date(0);
				this.time.setUTCSeconds(message.createdTimestamp);

				this.attachments = new Array();

				message.attachments.each((key, value) => {
						this.attachments.push(key.url);
				});
		}
}

// Get message ID for the first time
function getLastMessageId(channelId) {
		Bot.channels.cache.get(channelId).messages.fetch({ limit: 1 })
		.then(message => message.values().next().value.id);
}

function printAllMessages(channelId, before) {
		Bot.channels.cache.get(channelId).messages.fetch({
				limit: 100,
				before: before
		})
		.then((message) => {
				let nextMessageID = '';
				// Something to be noticed: in Collection.each(), the roles of
				// keys and values are reversed where as it would be the same
				// in other cases.
				message.each((key, value) => {
						// console.log(`${key.content} | ${key.author.username}#${key.author.discriminator} | ${key.id}`);
						messageHistory.push(new MessageStructure(key));
						nextMessageID = key.id;
				});

				if (nextMessageID != '') {
						++recursionMeter;
						console.log((recursionMeter*100), 'messages have been fetched');
						printAllMessages(channelId, nextMessageID);
				}

				else {
						fs.writeFile('messages.json', JSON.stringify(messageHistory, null, 4), (err) => {
								if (err)
										throw err;

								console.log('Messages are saved!');
						});
				}
		})
		.catch(err => console.log(err));
}

Bot.on('ready', () => {
		console.log('Bot is ready for exporting messages!');
		printAllMessages(channelId, getLastMessageId(channelId));
});

Bot.login(config.token);
