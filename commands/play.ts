import { ICommand } from "wokcommands";
import DJS, {
	Guild,
	GuildChannelResolvable,
	GuildMember,
	GuildResolvable,
	Interaction,
} from "discord.js";
import { DisClient } from '../index'
import { songRequest } from "../util/song-request";

export default {
	category: "Music",
	description: "Plays the song or add it to the queue",

	slash: true,
	testOnly: true,
	expectedArgs: "<song>",
	options: [
		{
			name: "song",
			description: "Enter the song name",
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	callback: async ({ interaction, client, guild}) => {
		if (!interaction) return

		try {
			songRequest(client as DisClient, interaction.channelId, undefined, interaction)
			interaction.reply({
				content: 'Song now playing! Check nodi-music channel for detail..',
				ephemeral: true
			})
		} catch {
			interaction.reply({
				content: 'Some error occured omaigawd! 😱',
				ephemeral: true
			})
			return
		}
	},
} as ICommand;
