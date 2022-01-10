import { ICommand } from "wokcommands";
import DJS, {
	GuildChannelResolvable,
	GuildMember,
	GuildResolvable,
	Interaction,
} from "discord.js";
import { player } from '../index'

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

	callback: async ({ interaction, client}) => {
		if (!interaction) return
		let guildQueue = player.getQueue(interaction.guild!.id)
		if (!guildQueue) {
			console.log("queue does not exist right now")
			guildQueue = player.createQueue(interaction.guild!.id)
			if (guildQueue) console.log('Ab hogyi create')
			else console.log('Ab bhi nahi hui')
		}
		let mem = interaction.member as GuildMember
		await guildQueue.join(mem.voice.channel as GuildChannelResolvable)
		let song = guildQueue.play(interaction.options.getString('song') as string)
		return 'check console'
	},
} as ICommand;
