const Discord = require('discord.js');
const config = require("config");
const Google = require("./googleSearch");
const Message = require("./message");
const constants = require("./constants");

const client = new Discord.Client();

client.on('ready', () => {
	console.log("Bot is connected!!!");
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	const query = message.content;

	console.log(query);

	if (query.startsWith(constants.COMMANDS.GOOGLE)) {

		await Message.setMessage(message, constants.COMMANDS.GOOGLE);

		return message.reply(await Google.getResults(message.content.replace(constants.COMMANDS.GOOGLE, "")));
	}

	if (query.startsWith(constants.COMMANDS.RECENT)) {

		return message.reply(
			await Message.getMessage(
				constants.RECENT_MESSAGE_COUNT,
				message.content.replace(constants.COMMANDS.RECENT, ""),
				message.author.id)
		);
	}

	if (query.startsWith(constants.COMMANDS.HI)) {

		return message.reply(constants.CHAT_RESPONSE.HI);
	}
});

client.login(config.get("bot_token"));