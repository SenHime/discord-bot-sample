const Database = require('better-sqlite3');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { database } = require('../../config.json');

const db = new Database(database);

const webhookName = 'CharacterWebhook';
const webhookReason = 'Character Webhook';

function getOrCreateWebhook(channel) {
	return new Promise(function(resolve, reject) {
		channel.fetchWebhooks()
		.then((hooks) => {
			const hook = hooks.find(h => h.name === webhookName);
			if (hook) {
				resolve(hook);
			} else {
				channel.createWebhook({
                    name: webhookName,
                    avatar: null,
					reason: webhookReason,
				})
				.then((hook) => {
					resolve(hook);
				})
				.catch(reject);
			}
		})
		.catch(reject);
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use_character')
		.setDescription('Poste un message sous l\'identité d\'un des personnages enregistrés')
        .addStringOption(option =>
			option.setName('alias')
				.setDescription('Alias pour identifier le personnage avec lequel poster')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message à poster')
                .setRequired(true)),
	async execute(interaction) {
        let feedback_msg = '';
        const character_alias = interaction.options.getString('alias');
        const character_msg = interaction.options.getString('message');

		const character = db.prepare('SELECT * FROM characters WHERE alias = ? AND discord_user_id = ?').get(character_alias, interaction.user.id);
        if (character) {
            const webhook = await getOrCreateWebhook(interaction.channel);
            webhook.send({
                content: character_msg,
                username: character.name,
                avatarURL: character.picture_url,
            });
            feedback_msg = 'Le message a bien été posté';
        } else {
            feedback_msg = 'Ce personnage n\'existe pas';
        }

		await interaction.reply({ content: feedback_msg, flags: MessageFlags.Ephemeral });
	},
};