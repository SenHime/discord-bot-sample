const Database = require('better-sqlite3');
const { MessageFlags, SlashCommandBuilder } = require('discord.js');
const { database } = require('../../config.json');

const db = new Database(database);

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;  
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
	// More info on possible parameters : https://discordjs.guide/slash-commands/advanced-creation.html#adding-options
	data: new SlashCommandBuilder()
		.setName('register_character')
		.setDescription('Enregistre (ou met à jour) un personnage')
		.addStringOption(option =>
			option.setName('alias')
				.setDescription('Alias pour identifier le personnage avec lequel poster')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Le nom complet du personnage')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('picture')
				.setDescription('L\'URL de l\'avatar à utiliser pour le personnage')
				.setRequired(true)),
	async execute(interaction) {
		const insert = db.prepare("INSERT INTO characters (alias, name, picture_url, discord_user_id) VALUES (?, ?, ?, ?)");
		let feedback_msg = '';
		const character_alias = interaction.options.getString('alias');
		const character_name = interaction.options.getString('name');
		const picture_url = interaction.options.getString('picture');

		if (isValidHttpUrl(picture_url)) {
			const character = db.prepare('SELECT * FROM characters WHERE alias = ? AND discord_user_id = ?').get(character_alias, interaction.user.id);
        	if (character) {
				try {
					const update = db.prepare('UPDATE characters SET name = @name, picture_url = @picture WHERE id=@id');
					update.run({
						name: character_name,
						picture: picture_url,
						id: character.id,
					});
					feedback_msg = 'Le personnage a bien été mis à jour';
				} catch (err) {
					feedback_msg = 'Une erreur s\'est produite lors de la mise à jour du personnage';
					console.error("Erreur lors de la mise à jour :", err.message);
				}
			} else {
				try {
					insert.run(character_alias, character_name, picture_url, interaction.user.id);
					feedback_msg = 'Le personnage a bien été sauvegardé';
				} catch (err) {
					feedback_msg = 'Une erreur s\'est produite lors de l\'enregistrement du personnage';
					console.error("Erreur à l'insertion :", err.message);
				}
			}
		} else {
			feedback_msg = 'L\'URL de l\'image n\'est pas valide';
		}

		await interaction.reply({ content: feedback_msg, flags: MessageFlags.Ephemeral });
	},
};