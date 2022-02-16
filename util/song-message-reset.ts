import { Message, TextChannel } from "discord.js"
import { Player, Track } from "@batzu/erela.js"
import { DisClient } from ".."
import mccSchema from '../models/music-channel-config'

let handleReset = async (client: DisClient, player: Player, track?: Track) => {
	let query = await mccSchema.findById(player.guild)
	let { musicChannelId, musicMessageId } = query
	let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
	let targetMessage = await targetChannel.messages.fetch(musicMessageId) as Message
	targetMessage.edit({
		content: 'This message will be edited with the song details'
	})
}

export { handleReset }