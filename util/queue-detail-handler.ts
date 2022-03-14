import { Player } from "@batzu/erela.js";
import { Message, TextChannel } from "discord.js";
import { DisClient } from "..";
import mccSchema from '../models/music-channel-config'

let handleQueueDetail = async (client: DisClient, player: Player) => {
	let query = await mccSchema.findById(player.guild)
	let { musicChannelId, musicMessageId } = query
	let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
	let targetMessage = await targetChannel.messages.fetch(musicMessageId) as Message
	// console.log('------------------------')
	// console.log(`TotalSize: ${player.queue.totalSize}   Size: ${player.queue.size}`)
	let count = 1
	let temp = ""
	let queueString = "**Queue:**\n"
	if (player.queue.size != player.queue.totalSize) {
		queueString += `1. ${player.queue.current?.title}  ~~ **Currently Playing**\n`;
		count = 2
	}
	if (player.queue.totalSize == 0 || !player) {
		targetMessage.edit({
			content: `**Queue:**\nNothing in queue rn brother man :))`,
		})
		return
	}

	player.queue.forEach((track) => {
		queueString += `${count++}. ${track.title}\n`
	})
	targetMessage.edit({
		content: queueString
	})
}

export { handleQueueDetail }