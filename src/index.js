/* This application was created by MajorGamerJay <majorgamerjay@protonmail.com>
 * under the MIT License */
// Major thanks to Crystal and Mishti who solved the rate limit problem for me

const Discord = require('discord.js');

const fs = require('fs');

const Bot = new Discord.Client();
const config = require('./config.json');

const channelId = config.channelID;

if (config.export_type == "json") {
		console.log(`Export type: JSON`);
		var messageHistory = new Array();
}

else {
		console.log(`Export type: md`);
		var messageHistory = '';
}

let recursionMeter = 0;

class AuthorStructureInJSON {
		constructor(message) {
				this.name = `${message.author.username}#${message.author.discriminator}`;
				this.avatar = message.author.displayAvatarURL();
		}
}

class MessageStructureInJSON {
		constructor(message) {
				this.author = new AuthorStructureInJSON(message);
				this.content = message.content;

				this.time = new Date(message.createdTimestamp);

				this.attachments = new Array();

				// Something to be noticed: in Collection.each(), the roles of
				// keys and values are reversed where as it would be the same
				// in other cases.
				message.attachments.each((key, value) => {
						this.attachments.push(key.url);
				});
		}
}

// Convert message into markdown
// mS means messageStructure and its kinda hard to retype everytime lol ;p
function convertMessageStructureIntoMarkdown(mS) {
		let convertedMessage = `### ${mS.author.name}\n`+
				`<img src="${mS.author.avatar}" width="128" height="128">\n\n`+
				`##### ${mS.time}\n\n`+
				`${mS.content}\n\n`+
				`Attachments: \n\n`;

		mS.attachments.forEach(perAttachment => {
				convertedMessage += `<img src="${perAttachment}" height="400" width="400">\n`;
		});

		return convertedMessage+'***';
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
		.then(message => {
				let nextMessageID = '';

				// Push to the array containing chat history
				message.each((key, value) => {
						// console.log(`${key.content} | ${key.author.username}#${key.author.discriminator} | ${key.id}`);
						const currentMessage = new MessageStructureInJSON(key);

						if (config.export_type == "json")
								messageHistory.push(currentMessage);
						else if (config.export_type == "md")
								messageHistory += convertMessageStructureIntoMarkdown(currentMessage) + '\n';

						nextMessageID = key.id;
				});

				// Do recursion
				if (nextMessageID != '') {
						++recursionMeter;
						console.log((recursionMeter*100), 'messages have been fetched');
						printAllMessages(channelId, nextMessageID);
				}

				// Write to file
				else {
						fs.writeFile(config.export_to, config.export_type === "json" ?
								JSON.stringify(messageHistory,
								null, 4) : messageHistory, (err) => {

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
