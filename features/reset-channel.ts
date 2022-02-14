import { Queue } from "discord-music-player";
import { Channel, Client, GuildChannel, Message, TextChannel } from "discord.js";
import { Player, Track } from "erela.js";
import { DisClient, player } from '../index'
import mccSchema from '../models/music-channel-config' 

export default (c: Client) => {
	let handleReset = async (player: Player, track?: Track) => {
		let query = await mccSchema.findById(player.guild)
		let { musicChannelId, musicMessageId } = query
		let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
		let targetMessage = await targetChannel.messages.fetch(musicMessageId) as Message
		targetMessage.edit({
			content: 'This message will be edited with the song details'
		})
	}

	let client = c as DisClient
	client.manager.on('trackEnd', handleReset)
	client.manager.on('playerDestroy', handleReset)
	// player.on('queueDestroyed', handleReset)
	// player.on('queueEnd', handleReset)
	// player.on('clientDisconnect', handleReset)
}