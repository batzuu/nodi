// quick stop command 

import { Guild, GuildResolvable } from "discord.js";
import { ICommand } from "wokcommands";
import { player } from '../index'

export default {
	category: 'Music',
	description: 'Clears queue',

	slash: true,
	testOnly: true,

	callback: async ({ guild, interaction }) => {
		return 'TODO'
	}
} as ICommand