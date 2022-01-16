import { ChannelResolvable, Client, Guild, GuildChannelResolvable, GuildMember, GuildResolvable, Interaction, Message, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {DisClient, player, songCollection} from '../index'

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
		let query = await mccSchema.findById(message.guild!.id)

		// query is null after setting music channel on a new server
		if (!query) return

		let { musicChannelId } = query

		// Do not listen if the message is not on the music channel
		if (message.author.bot == true || (message.channel.id != musicChannelId)) return

		let clientextended = client as DisClient

		let mem = message.member as GuildMember
		let player  = clientextended.manager.create({
			guild: message.guild!.id,
			voiceChannel: mem.voice.channel!.id,
			textChannel: message.channel!.id
		})

		let res = await player.search(message.content as string, message.member)
		let guildId = message.guild!.id

		// let guildQueue = player.getQueue(message.guild!.id)
		// if (!guildQueue) {
		// 	guildQueue = player.createQueue(message.guild!.id)
		// }

		try {
			if (!player.playing)
				player.connect()

			if (songCollection[guildId]) {
				songCollection[guildId].push(res.tracks[0])
			} else {
				songCollection[guildId] = [res.tracks[0]]
				if (!player.playing && !player.paused && !player.queue.size) {
					player.play(res.tracks[0])
				}
				if (
					!player.playing &&
					!player.paused &&
					player.queue.totalSize === res.tracks.length
				)
					player.play(res.tracks[0]);
			}

		} catch {
			message.reply({
				content: 'Could not join the voice channel',
			}).then(reply => {
				setTimeout(() => {
					reply.delete()
				}, 3 * 1000)
			})
		}
		setTimeout(() => {
			message.delete()
		}, 1 * 1000)
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}