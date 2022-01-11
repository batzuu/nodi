import { ChannelResolvable, Client, GuildChannelResolvable, GuildMember, GuildResolvable, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {player} from '../index'

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
		let query = await mccSchema.findById(message.guild!.id)

		// query is null after setting music channel on a new server
		if (!query) return

		let { musicChannelId } = query

		// Do not listen if the message is not on the music channel
		if (message.author.bot == true || (message.channel.id != musicChannelId)) return

		let guildQueue = player.getQueue(message.guild!.id)

		if (!guildQueue) {
			guildQueue = player.createQueue(message.guild!.id)
		}

		let mem = message.member as GuildMember
		await guildQueue.join(mem.voice.channel as GuildChannelResolvable)
		guildQueue.play(message.content)
		setTimeout(() => {
			message.delete()
		}, 1 * 1000)
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}