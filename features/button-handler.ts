import { Client, GuildMember } from "discord.js";
import { DisClient } from "..";
import { Manager } from "@batzu/erela.js";

export default (c: Client) => {
	let client = c as DisClient
	client.on('interactionCreate', (interaction) => {
		if (!interaction.isButton()) return

		let player = client.manager.get(interaction.guildId!)
		if ((interaction.member as GuildMember).voice.channelId != player?.voiceChannel) {
			interaction.reply({
				content: 'Bhag bsdk',
				ephemeral: true
			})
			return
		}
		player?.destroy()
		interaction.reply({
			content: 'Stopped! Player Destroyed'
		})
		setTimeout(() => {
			interaction.deleteReply()
		}, 3 * 1000)
	})
}