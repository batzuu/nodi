import { Queue } from "discord-music-player"
import { Client, TextChannel } from "discord.js"
import play from "../commands/play"
import { player } from "../index"
import mccschema from '../models/music-channel-config'

export default (client: Client) => {
	player.on('clientDisconnect', async (queue: Queue) => {
		if (!queue) console.log('i knew it')
		console.log('yeyeyey')
		let guild = queue.guild
		let query = await mccschema.findById(guild.id)

		const { musicChannelId, musicMessageId} = query
		const musicChannel = client.channels.cache.get(musicChannelId) as TextChannel
		const musicMessage = await musicChannel.messages.fetch(musicMessageId)
		musicMessage.edit({
			content: 'Tis message will be edited'
		})
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}