import DJS, { WelcomeChannel } from 'discord.js'
import { ICommand } from "wokcommands";
import tccSchema from '../models/text-channel-config'

export default {
	category: 'Music',
	description: 'Setup the NodiMusic Channel',

	slash: true,
	testOnly: true,
	expectedArgs: '<channel>',
	options: [
		{
			name: 'text-channel',
			description: 'Enter the text channel for NodiMusic',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
		}
	],

	callback: async ({ interaction, guild }) => {
		// If used in dms
		if (!guild) {
			interaction.reply({
				content: 'Command only availaible on servers',
			})
			return
		}

		let musicChannel = interaction.options.getChannel('text-channel');

		if (musicChannel?.type != 'GUILD_TEXT') {
			interaction.reply({
				content: 'Enter a valid text channel',
				ephemeral: true
			})
			return
		}
		await tccSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, musicChannelId: musicChannel.id}, {upsert: true})

		interaction.reply({
			content: 'Music Channel Set',
			ephemeral: true
		})
	}
} as ICommand