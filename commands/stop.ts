// quick stop command 

import { ICommand } from "wokcommands";
import { DisClient, player, songCollection } from '../index'

export default {
	category: 'Music',
	description: 'Clears queue',

	slash: true,
	testOnly: true,

	callback: async ({ interaction, client, guild }) => {
		let clientextended = client as DisClient

		let player = clientextended.manager.get(guild!.id as string)

		if (!player) {
			interaction.reply({
				content: 'Nothing to stop!',
				ephemeral: true
			})
			return
		}

		// Resetting the queue
		player.destroy()

		interaction.reply({
			content: 'Queue destroyed muhahiahaha!',
			ephemeral: true
		})

		// let guildQueue = player.getQueue(guild!.id)
		// if (!guildQueue) {
		// 	interaction.reply({
		// 		content: 'Queue is already empty!',
		// 		ephemeral: true
		// 	})
		// 	return
		// }
		// // leave_on stop is disabled
		// guildQueue.stop()
		// interaction.reply({
		// 	content: 'Queue stoped and cleaned',
		// 	ephemeral: true
		// })
		// return
	}
} as ICommand