import { Queue, Song } from "discord-music-player";
import { Client, Guild, TextChannel } from "discord.js";
import { DisClient, player } from '../index'
import mccSchema from '../models/music-channel-config'

export default (client: DisClient) => {

	client.manager.on('trackStart', async (player, track) => {
		let query = await mccSchema.findById(player.guild)
		let { musicChannelId, musicMessageId } = query

		let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
		let message = await targetChannel.messages.fetch(musicMessageId)	

		message.edit({
			content: `Now playing ${track.title}`
		})
	})

	// player.on('songFirst', handleSongChange)
	// player.on('songChanged', handleSongChange)
}
