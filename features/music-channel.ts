import { Client } from "discord.js";

export default (client: Client) => {
	client.on('channelCreate', (channel) => {
		const {guild, id} = channel
	})
}