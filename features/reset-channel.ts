import { Channel, Client, GuildChannel, Message, TextChannel } from "discord.js";
import { DisClient } from '../index'
import mccSchema from '../models/music-channel-config' 
import { handleReset } from "../util/song-message-reset";
import { Player, Track } from '@batzu/erela.js'
import { handleQueueDetail } from "../util/queue-detail-handler";

export default (c: Client) => {
	let client = c as DisClient
	client.manager.on('queueEnd', (player, track) => {
		handleReset(client, player, track as Track)
	})
	client.manager.on('playerDestroy', (player) => {
		handleReset(client, player)
	})
	client.manager.on('playerMove', (player) => {})
	client.manager.on('trackEnd', (player, track) => {
		handleQueueDetail(client,player)
	})
	// scuffed eventhandler to handle updating queue details
	client.manager.addListener('queueChange', (player: Player) => {
		handleQueueDetail(client as DisClient, player)
	})
	// player.on('queueDestroyed', handleReset)
	// player.on('queueEnd', handleReset)
	// player.on('clientDisconnect', handleReset)
}