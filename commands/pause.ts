import { ICommand } from "wokcommands";
import { player } from '../index'

export default {
	category: 'Music',
	description: 'Pauses the queue',

	slash: true,
	testOnly: true,

	callback: ({ interaction, guild }) => {
		let guildQueue = player.getQueue(guild!.id)
		if (!guildQueue) {
			interaction.reply({
				content: 'Nothing to pause buddy boy',
				ephemeral: true
			})
			return
		}
		if (guildQueue.paused) {
			guildQueue.setPaused(false)
		} else {
			guildQueue.setPaused(true)
		}
		interaction.reply({
			content: 'Queue pause state changed broder man',
			ephemeral: true
		})
		return
	}
} as ICommand