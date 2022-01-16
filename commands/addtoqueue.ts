import { Constants } from "discord.js";
import { ICommand } from "wokcommands";
import { DisClient } from "..";
import { songCollection } from "..";

export default {
	category: 'Testing',
	description: 'Searching and printing the current queue',

	slash: true,
	testOnly: true,
	expectedArgs: "songi",
	options: [
		{
			name: 'songi',
			required: false,
			description: 'testing queue',
			type: Constants.ApplicationCommandOptionTypes.STRING
		}
	],
	callback: async ({ interaction, client, guild }) => {
		return 'TODO'
	}
		
} as ICommand