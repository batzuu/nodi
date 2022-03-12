import { Client, GuildMember } from "discord.js";
import { DisClient } from "..";

export default (client: Client) => {
	client.on('voiceStateUpdate', (oldS, newS) => {
		let player = (client as DisClient).manager.get(oldS.guild.id)
		if (!player) {
			return
		}
		let mem = oldS.member
		
		if (!mem?.user.bot) return
		if (newS.channelId === null) {
			player.destroy()
		}
	})

}