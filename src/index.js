/* This application was created by MajorGamerJay <majorgamerjay@protonmail.com>
 * under the MIT License. Enjoy using this program and feel free to contribute! */

/* Major thanks to Crystal and Mishti who solved the rate limit problem for me */

/* Importing global modules */
const Discord = require('discord.js');
const fs = require('fs');

/* Importing local modules */
const Structures = require('./modules/Structures');
const Converters = require('./modules/Converters');

/* Declaring variables and clients */
const Bot = new Discord.Client();
const config = require('./config.json');

const channelId = config.channelID;

if (config.export_type == "json") {
    console.log(`Export type: JSON`);
    var messageHistory = new Array(); // I don't like "var"s but I had to
}

else {
    config.export_type == "md" ? console.log(`Export type: md`)
        : console.log(`Export type: HTML`);
    var messageHistory = '';
}

/* Counting recursions */
let recursionMeter = 0;

/* Get message id for the first time */
function getLastMessageId(channelId) {
    Bot.channels.cache.get(channelId).messages.fetch({ limit: 1 })
        .then(message => message.values().next().value.id);
}

/* Main recursive function that will do the task */
function printAllMessages(channelId, before) {
    Bot.channels.cache.get(channelId).messages.fetch({
        limit: 100,
        before: before
    })
        .then(message => {
            let nextMessageID = '';

            /* Push to the array containing chat history */
            message.each((key, value) => {
                // console.log(`${key.content} | ${key.author.username}#${key.author.discriminator} | ${key.id}`);
                const currentMessage = new Structures.MessageStructureInJSON(key);

                if (config.export_type == "json")
                    messageHistory.push(currentMessage);
                else if (config.export_type == "md")
                    messageHistory += Converters.convertMessageStructureIntoMarkdown(currentMessage) +
                        '\n';

                nextMessageID = key.id;
            });

            /* Do recursion */
            if (nextMessageID != '') {
                ++recursionMeter;
                console.log((recursionMeter*100), 'messages have been fetched');
                printAllMessages(channelId, nextMessageID);
            }

            /* Write to file */
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

/* Triggers when the client is ready to roll */
Bot.on('ready', () => {
    console.log('Bot is ready for exporting messages!');
    printAllMessages(channelId, getLastMessageId(channelId));
});

Bot.login(config.token);
