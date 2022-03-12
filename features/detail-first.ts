import { Track } from "@batzu/erela.js";
import { Client, Guild, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js";
import { DisClient } from '../index'
import mccSchema from '../models/music-channel-config'

function extractVideoID(url: string) {
	var regExp =
		/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[7].length == 11) {
		return match[7];
	} else {
		alert("Could not extract video ID.");
	}
}

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
				.setStyle('DANGER'),
			new MessageButton()
				.setCustomId('pause')
				.setEmoji('⏸')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('skip')
				.setEmoji('⏭')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('minus10')
				.setLabel('-10')
				.setStyle('SECONDARY'),
			new MessageButton()
				.setCustomId('plus10')
				.setLabel('+10')
				.setStyle('SECONDARY'),
		)
		let trackSec = track.duration / 1000
		let vidId = extractVideoID(track.uri)
		let embed = new MessageEmbed()
			.setTitle(`${track.title} | [${Math.floor(trackSec / 60)}:${trackSec % 60}]`)
			.setImage(`https://img.youtube.com/vi/` + `${vidId}` + `/hqdefault.jpg`)
		message.edit({
			// content: `Now playing ${track.title} | [${Math.floor(trackSec / 60)}:${trackSec % 60}]`,
			embeds: [embed],
			components: [row]
		})
	})
}
