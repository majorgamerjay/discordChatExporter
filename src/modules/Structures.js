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

module.exports = {
	AuthorStructureInJSON: AuthorStructureInJSON,
	MessageStructureInJSON: MessageStructureInJSON
};
