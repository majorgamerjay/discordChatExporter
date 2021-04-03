# discordChatExporter
## majorgamerjay@protonmail.com

<img src="https://i.imgur.com/CsbAhWt.png" align="right" width="400px">

***>tfw u cant export messages on discord***

This is a Discord chat exporter made in NodeJS. It supports exporting as *JSON* and *markdown* (for now). Configuration is simple and everything is in one `config.json` file. If you like this, consider contributing to this repository or sharing this to others.

## How to use it

This guide is aimed towards *nix users. For Windows users, you can use [Tyrrrz's DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) or just change the file paths here to *windows style*.

### Requirements

1. Node & NPM
2. Bot token (account token is also possible if you know where to modify the discord.js code for account token ;) )

### Downloading and installing

1. Clone this repository
2. In the repository, execute `npm install`

This should install discord.js and dependencies for it.

### Configuring

1. Copy `config_template.json` from root directory of the repository to `src/config.json`
2. See the options and configure accordingly.

```json
{
		"token": "<insert your token here>",
		"channelID": "<insert channel id here>",
		"export_type": "<json/md>",
		"export_to": "output/messages.<json/md>"
}
```
In `export_type`, it should be either `json` or `md`.

It is recommended to put the export path (`export_to`) to be `output/<filename>` or outside the repository as this could make trouble with the repository itself.

### Using

This should be done after it is configured properly or it will not work!

1. Change directory to `src`, `cd src`
2. Make a directory called output, `mkdir output`
3. Run `node index.js`

## Issues and PRs

### Issues

If you have any issues, feel free to open up one! I'll help as much as I can.

###  Pull Requests

Pull requests are welcomed. Just make sure the code is nice and readable. ;) (*even tho mine suckks*)

## License

This is under MIT License. Enjoy ;p
