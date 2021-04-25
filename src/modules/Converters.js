
// Convert message into markdown
// mS means messageStructure and its kinda hard to retype everytime lol ;p
function convertMessageStructureIntoMarkdown(mS) {
    let convertedMessage = `### ${mS.author.name}\n`+
        `<img src="${mS.author.avatar}" width="40" height="40">\n\n`+
        `##### ${mS.time}\n\n`+
        `${mS.content}\n\n`+
        `Attachments: \n\n`;

    mS.attachments.forEach(perAttachment => {
        convertedMessage += `<img src="${perAttachment}" width="300">\n`;
    });

    return convertedMessage+'***';
}

module.exports = {
    convertMessageStructureIntoMarkdown: convertMessageStructureIntoMarkdown
};
