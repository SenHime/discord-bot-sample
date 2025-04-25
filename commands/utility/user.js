const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Fournit des informations à propos de l\'utilisateur.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Cette commande a été lancée par ${interaction.user.username}, qui a rejoint le serveur le ${interaction.member.joinedAt}.`);
	},
};