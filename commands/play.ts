import { ICommand } from "wokcommands";
import DJS, {
	GuildChannelResolvable,
	GuildMember,
	GuildResolvable,
} from "discord.js";
import { player } from "../index";
import { Track } from "discord-player";

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

	callback: async ({ interaction, client }) => {
		let song = interaction.options.getString("song");
		interaction.deferReply();

		if (player) {
			const queue = player.createQueue(
				interaction.guild as GuildResolvable,
				{
					metadata: {
						channel: interaction.channel,
					},
				}
			);

			const mem = interaction.member as GuildMember;
			try {
			if (!queue.connection)
				await queue.connect(
					mem.voice.channel as GuildChannelResolvable
				);
			} catch {
				queue.destroy();
				await interaction.editReply('Could not join your channel')
			}
			console.log('ok')
			console.log('ook')

			const track = await player
				.search(song as string, {
					requestedBy: interaction.user,
				})
				.then((x) => x.tracks[0]) as Track;
			if (!track) {
				await interaction.editReply({
					content: `❌ | Track **${song}** not found!`,
				})
				return
			}
			queue.play(track);
			await interaction.editReply({
				content: `playing ${track.title}`
			})

		} else console.log("Jiska dar tha vou hua");
	},
} as ICommand;
