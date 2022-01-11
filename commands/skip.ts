import { ICommand } from "wokcommands";
import { player } from '../index'

export default {
	category: 'Music',
	description: 'Skips the current song',

	slash: true,
	testOnly: true,

	callback: ({ interaction, guild }) => {
		if (!player) {
			console.log('Player was NULL')
			return 'Some error occured'
		}

		let guildQueue = player.getQueue(guild!.id)

		if (!guildQueue) {
			interaction.reply({
				content: 'Nothing to skip! Queue is empty.',
				ephemeral: true
			})
			return
		}
		let skippedSong = guildQueue.skip()

		interaction.reply({
			content: `${skippedSong.name} was skipped.`,
			ephemeral: true
		})
	}
} as ICommand