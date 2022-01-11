import { Queue, Song } from "discord-music-player";
import { Client, TextChannel } from "discord.js";
import { player } from '../index'
import mccSchema from '../models/music-channel-config'

export default (client: Client) => {
	let handleSongChange = async (queue: Queue, song: Song, oldSong?: Song) => {
		let query = await mccSchema.findById(queue.guild.id)
		let { musicChannelId, musicMessageId } = query

		let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
		let message = await targetChannel.messages.fetch(musicMessageId)	

		message.edit({
			content: `Now playing ${song.name} by ${song.author}`
		})
	}

	player.on('songFirst', handleSongChange)
	player.on('songChanged', handleSongChange)
}
