import { ChannelResolvable, Client, Guild, GuildChannelResolvable, GuildMember, GuildResolvable, Interaction, Message, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {DisClient, player, songCollection} from '../index'
import { songRequest } from "../util/song-request";

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
		let query = await mccSchema.findById(message.guild!.id)

		// query is null after setting music channel on a new server
		if (!query) return

		let { musicChannelId } = query

		// Do not listen if the message is not on the music channel or authored by bot
		if (message.author.bot == true || (message.channel.id != musicChannelId)) return
		if (!message.member?.voice.channelId) {
			message.reply('No').then(reply => {
				setTimeout(() => {
					reply.delete()
					message.delete()
				}, 2 * 1000)
			})
			return
		}

		songRequest(client as DisClient, message.channel.id, message)
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}