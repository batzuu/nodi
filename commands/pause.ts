import { ICommand } from "wokcommands";
import { DisClient, player } from '../index'

export default {
	category: 'Music',
	description: 'Pauses the queue',

	slash: true,
	testOnly: true,

	callback: ({ interaction, guild, client }) => {
		let player = (client as DisClient).manager.get(guild!.id)
		if (!player) {
			interaction.reply({
				content: 'Nothing to pause buddy boy',
				ephemeral: true
			})
			return
		}
		if (player.playing) {
			player.pause(true)
		} else {
			player.pause(false)
		}
		interaction.reply({
			content: 'Queue pause state changed broder man',
			ephemeral: true
		})
		return
	}
} as ICommand