import { Queue } from "discord-music-player";
import { Channel, Client, GuildChannel, Message, TextChannel } from "discord.js";
import { player } from '../index'
import mccSchema from '../models/music-channel-config' 

export default (client: Client) => {
	let handleReset = async (guildQueue: Queue) => {
		let query = await mccSchema.findById(guildQueue.guild.id)
		let { musicChannelId, musicMessageId } = query
		let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
		let targetMessage = await targetChannel.messages.fetch(musicMessageId) as Message

		targetMessage.edit({
			content: 'The message will be edited'
		})
	}
	player.on('queueDestroyed', handleReset)
	player.on('queueEnd', handleReset)
	player.on('clientDisconnect', handleReset)
}