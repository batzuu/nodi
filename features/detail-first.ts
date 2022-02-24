import { Queue, Song } from "discord-music-player";
import { Client, Guild, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { DisClient, player } from '../index'
import mccSchema from '../models/music-channel-config'

export default (client: DisClient) => {

	client.manager.on('trackStart', async (player, track) => {
		let query = await mccSchema.findById(player.guild)
		let { musicChannelId, musicMessageId } = query

		let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
		let message = await targetChannel.messages.fetch(musicMessageId)	

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('stop')
				.setEmoji('✋')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('pause')
				.setEmoji('⏸')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('skip')
				.setEmoji('⏭')
				.setStyle('PRIMARY')
		)
		message.edit({
			content: `Now playing ${track.title}`,
			components: [row]
		})
	})

	// player.on('songFirst', handleSongChange)
	// player.on('songChanged', handleSongChange)
}
