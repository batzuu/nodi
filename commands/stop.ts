// quick stop command 

import { ICommand } from "wokcommands";
import { player } from '../index'

export default {
	category: 'Music',
	description: 'Clears queue',

	slash: true,
	testOnly: true,

	callback: async ({ guild, interaction }) => {
		

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