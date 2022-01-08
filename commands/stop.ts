// quick stop command 

import { Queue } from "discord-player";
import { Guild, GuildResolvable } from "discord.js";
import { ICommand } from "wokcommands";
import { player } from '../index'

export default {
	category: 'Music',
	description: 'Clears queue',

	slash: true,
	testOnly: true,

	callback: async ({ guild, interaction }) => {
		if (player) {
			let queue = player.getQueue(guild as GuildResolvable)
			if (queue) {
				queue.destroy()
				await interaction.reply({
					content: 'Queue Destroyed',
					ephemeral: true
				})
				return 
			} else {
				await interaction.reply({
					content: 'Nothing in queue',
					ephemeral: true
				})
				return 
			}
		} else {
			return 'No player {dev_error}'
		}
	}
} as ICommand