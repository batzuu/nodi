import { ChannelResolvable, Client, GuildChannelResolvable, GuildResolvable, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {player} from '../index'
import { Track } from "discord-player";

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
		let query = await mccSchema.findById(message.guildId)
		let { musicChannelId, musicMessageId } = query
		if (message.channelId == musicChannelId) {
			let targetChannel = message.channel
			let queue = player.createQueue(
				message.guild as GuildResolvable
			)

			let mem = message.member
			if (!queue.connection) {
				try {
					console.log('User in ', mem?.voice.channel?.name)
					await queue.connect(
						mem?.voice.channel as GuildChannelResolvable
					)
				} catch {
					queue.destroy();
					targetChannel.send({
						content: 'Could not join the voice channel'
					}).then(message => {
						setTimeout(() => message.delete(), 5 * 1000)
					})
					return
				}
			}
			let track = (await player
				.search(message.content as string, {
					requestedBy: message.author,
				})
				.then((x) => x.tracks[0])) as Track;
			
			if (!track) {
				targetChannel.send({
					content: 'Song not found'
				}).then(message => {
					setTimeout(() => message.delete(), 5 * 1000)
				})
				return
			} 
			let targetText = await targetChannel.messages.fetch(musicMessageId)
			targetText.edit({
				content: `Now playing ${track.title}`,
			})
			queue.play(track);
			setTimeout(() => {
				message.delete()
			}, 5 * 1000)
		}
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}