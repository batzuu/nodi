import { ChannelResolvable, Client, GuildChannelResolvable, GuildMember, GuildResolvable, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {player} from '../index'

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
		console.log('waat')
		let query = await mccSchema.findById(message.guild!.id)
		let { musicMessageId } = query
		console.log(musicMessageId)
		console.log(message.id)
		if (message.author.bot == true || (musicMessageId == message.id)) return
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