import { Constants } from "discord.js";
import { ICommand } from "wokcommands";
import { DisClient, player } from '../index'
import play from "./play";

export default {
	category: 'Music',
	description: 'Skips the current song',
	expectedArgs: '<skip_amount>',

	slash: true,
	testOnly: true,

	options: [
		{
			name: 'skip_amount',
			description: 'Enter amount of songs to skip | Enter nothing to skip current song',
			required: false,
			type: Constants.ApplicationCommandOptionTypes.NUMBER
		}
	],

	callback: ({ interaction, guild, client }) => {

		let player = (client as DisClient).manager.get(guild!.id)

		if (!player) {
			interaction.reply({
				content: 'Nothing to skip my buddy!!!',
				ephemeral: true
			})
			return
		}

		let amt = interaction.options.getNumber('skip_amount')

		interaction.reply({
			content: `${player.queue.current?.title} skipped!`,
			ephemeral: true
		})

		if (amt) player.stop(amt)
		else player.stop()

		// if (!player) {
		// 	console.log('Player was NULL')
		// 	return 'Some error occured'
		// }

		// let guildQueue = player.getQueue(guild!.id)

		// if (!guildQueue) {
		// 	interaction.reply({
		// 		content: 'Nothing to skip! Queue is empty.',
		// 		ephemeral: true
		// 	})
		// 	return
		// }
		// let skippedSong = guildQueue.skip()

		// interaction.reply({
		// 	content: `${skippedSong.name} was skipped.`,
		// 	ephemeral: true
		// })
	}
} as ICommand