import { Client, GuildMember } from "discord.js";
import { DisClient } from "..";
import { Manager } from "@batzu/erela.js";

export default (c: Client) => {
	let client = c as DisClient
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isButton()) return

		let player = await client.manager.get(interaction.guildId!)
		let interId = interaction.customId

		let repl: string = 'empty'
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
				repl = 'Stopped! Player Destroyed'
				break
			}
			case 'pause': {
				if (player?.playing) {
					player.pause(true)
				} else {
					player!.pause(false)
				}
				repl = 'Pause state changed'
				break
			}
			case 'skip': {
				if (!player?.queue.size) {
					repl = 'Nothing to skip! Queue Empty!'
				} else {
					player.stop()
					repl = 'Next SONG! chalo'
					break
				}
			}
			case 'plus10': {
				player?.seek(Math.min(player.queue.current?.duration as number, player.position + 10000))
				repl = '+10sec, Done!'
				break
			}
			case 'minus10': {
				player?.seek(Math.max(0, player.position - 10000))
				repl = '-10sec, Done!'
				break
			}
		}
		interaction.reply({
			content: repl,
		})
		setTimeout(() => {
			interaction.deleteReply()
		}, 3 * 1000)
	})
}