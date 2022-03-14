import { ICommand } from "wokcommands";
import { DisClient } from "..";

export default {
	category: 'Testing',
	description: 'Prints the queue size on console',

	slash: true,
	testOnly: true,

	callback: async ({client, guild, interaction}) => {
		let player = (client as DisClient).manager.get(guild!.id)
		if (!player) {
			interaction.reply({
				content: 'Player was null',
				ephemeral: true
			})
			return
		}
		console.log(`TotalSize: ${player.queue.totalSize}   Size: ${player.queue.size}`)
		interaction.reply({
			content: 'Check console',
			ephemeral: true
		})
	}

} as ICommand