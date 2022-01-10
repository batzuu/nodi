import DJS, { DiscordAPIError, Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
import { Player, Queue } from 'discord-music-player'

dotenv.config()

const client = new DJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
})

// Player initialization
const player = new Player(client, {
	leaveOnEmpty: false,
	leaveOnEnd: false
})

player.on('clientDisconnect', (queue: Queue) => {
	console.log('bot was disconnected')
})

client.on('ready', async () => {

	// WOK Commands initialization
	const wok = new WOKCommands(client, {
		
		commandDir: path.join(__dirname, 'commands'),
		featureDir: path.join(__dirname, 'features'),
		typeScript: true,

		testServers: ['923972892683817011', '460800811518394368'],
		botOwners: ['396216482138161153'],
		mongoUri: process.env.MONGO_URI,
	})
})

client.login(process.env.TOKEN)

export { player }