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
		this.embeds = new Array();

		message.attachments.each((key, value) => {
			this.attachments.push(key.url);
		});

		message.embeds.forEach(perEmbed => {
			this.embeds.push(perEmbed);
		});
	}
}

module.exports = {
	AuthorStructureInJSON: AuthorStructureInJSON,
	MessageStructureInJSON: MessageStructureInJSON
};
