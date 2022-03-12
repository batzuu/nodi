import { Message, MessageEmbed, TextChannel } from "discord.js"
import { Player, Track } from "@batzu/erela.js"
import { DisClient } from ".."
import mccSchema from '../models/music-channel-config'

let handleReset = async (client: DisClient, player: Player, track?: Track) => {
	let query = await mccSchema.findById(player.guild)
	let { musicChannelId, musicMessageId } = query
	let targetChannel = await client.channels.fetch(musicChannelId) as TextChannel
	let targetMessage = await targetChannel.messages.fetch(musicMessageId) as Message
	let defaultEmbed = new MessageEmbed()
		.setTitle('Kya bajau bhaaai!!')
		.setImage('https://cdn.discordapp.com/attachments/647062306441658369/906197845558841364/unknown.png')
		.setColor('BLURPLE')
	targetMessage.edit({
		content: `**Queue:**\nNothing in queue rn brother man :))`,
		embeds: [defaultEmbed],
		components: []
	})
}

export { handleReset }