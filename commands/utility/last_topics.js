const Parser = require('rss-parser');
const { SlashCommandBuilder } = require('discord.js');
const { forum } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('last_topics')
		.setDescription('Affiche les 5 derniers topics mis à jour sur le forum (depuis le flux RSS)'),
	async execute(interaction) {
		const rssUrl = `${forum}/rss`;
		const parser = new Parser();
		let feed = await parser.parseURL(rssUrl);
		const topics = feed.items.slice(0, 5).map(item => {
			return `- ${item.title} : <${item.link}>`;
		});

		await interaction.reply(topics.join('\n'));
	},
};