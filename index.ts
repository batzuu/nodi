import DJS, { Client, DiscordAPIError, Guild, GuildMember, Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
import { Manager, SearchResult, Track } from '@batzu/erela.js'

dotenv.config()

interface DisClient extends Client {
	manager: Manager
}
const client = new DJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
}) as DisClient

client.manager = new Manager({
	nodes: [
		{
			host: process.env.LAVA_URI as string,
			port: 2333,
			password: "youshallnotpass"
		},
	],
	send(id, payload) {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	}
})
.on('nodeConnect', (node) => {
	console.log(`Node ${node.options.identifier} connected`)
})
.on('nodeError', (node, error) => {
	console.log(`Node ${node.options.identifier} had an error`)	
})

let songCollection = {} as {
	[key: string]: [Track?]
}


client.on('ready', async () => {

	// WOK Commands initialization
	const wok = new WOKCommands(client, {
		commandDir: path.join(__dirname, 'commands'),
		featureDir: path.join(__dirname, 'features'),
		typeScript: true,

		testServers: ['923972892683817011', '460800811518394368', '930391815465603144', '639524964243865633', '847735333507432458'],
		botOwners: ['396216482138161153'],
		mongoUri: process.env.MONGO_URI,
	})
	
	client.manager.init(client.user!.id as string)

})

const event = new Event('trackAdd')


client.on("raw", (d) => client.manager.updateVoiceState(d));


client.login(process.env.TOKEN)

export { DisClient, songCollection }