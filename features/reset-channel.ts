import { Queue } from "discord-music-player";
import { Channel, Client, GuildChannel, Message, TextChannel } from "discord.js";
import { DisClient, player } from '../index'
import mccSchema from '../models/music-channel-config' 
import { handleReset } from "../util/song-message-reset";
import { Player } from '@batzu/erela.js'

export default (c: Client) => {
	let client = c as DisClient
	client.manager.on('trackEnd', (player, track) => {
		handleReset(client, player, track)
	})
	client.manager.on('playerDestroy', (player) => {
		handleReset(client, player)
	})
	// player.on('queueDestroyed', handleReset)
	// player.on('queueEnd', handleReset)
	// player.on('clientDisconnect', handleReset)
}