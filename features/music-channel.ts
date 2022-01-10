import { ChannelResolvable, Client, GuildChannelResolvable, GuildResolvable, TextChannel } from "discord.js";
import mccSchema from '../models/music-channel-config'
import {player} from '../index'

export default (client: Client) => {
	client.on('messageCreate', async (message) => {
	})
}

export const config = {
	displayName: 'Music Channel',
	dbName: 'MUSIC_CHANNEL'
}