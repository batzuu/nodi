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
		.setTitle('Play songs using name or link after joining a voice channel')
		.setImage('https://ae01.alicdn.com/kf/HTB1PRkUJ1GSBuNjSspbq6AiipXaY/The-new-TV-clown-fool-30cm-Noddy-plush-toy-doll-Noddy-Oui-Oui-Plush-Toy-Mini.jpg_Q90.jpg_.webp')
		.setColor('BLURPLE')
	targetMessage.edit({
		content: `**Queue:**\nNothing in queue`,
		embeds: [defaultEmbed],
		components: []
	})
}

export { handleReset }