import { Client } from "discord.js";
import { DisClient } from "..";

export default (client: Client) => {
	client.on('voiceStateUpdate', (oldS, newS) => {
		let player = (client as DisClient).manager.get(oldS.guild.id)
		if (!player) {
			return
		}
		if (newS.channelId === null) {
			player.destroy()
		}
	})

}