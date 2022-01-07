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

	callback: ({ guild }) => {
		if (player) {
			let queue = player.getQueue(guild as GuildResolvable)
			if (queue) {
				queue.destroy()
				return 'Queue Destroyed'
			} else {
				return 'Nothing in Queue'
			}
		} else {
			return 'No player {dev_error}'
		}
	}
} as ICommand