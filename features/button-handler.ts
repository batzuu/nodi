import { Client, GuildMember } from "discord.js";
import { DisClient } from "..";
import { Manager } from "@batzu/erela.js";

export default (c: Client) => {
	let client = c as DisClient
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isButton()) return

		let player = await client.manager.get(interaction.guildId!)
		let interId = interaction.customId

		switch (interId) {
			case 'stop': {
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
				//
				break
			}
			case 'pause': {
				if (player?.playing) {
					player.pause(true)
				} else {
					player!.pause(false)
				}
				break
			}
		}
		setTimeout(() => {
			interaction.deleteReply()
		}, 3 * 1000)
	})
}