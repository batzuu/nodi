import { Player } from "@batzu/erela.js";
import { CommandInteraction, DMChannel, GuildManager, GuildMember, GuildMemberEditData, Message, TextChannel } from "discord.js";
import { MembershipStates } from "discord.js/typings/enums";
import { DisClient } from "..";

var songRequest = async (client: DisClient, textChannel?: string, message?: Message, interaction?: CommandInteraction) => {
	let member, guildId, query
	// bad: TODO
	if (message) {
		member = message.member as GuildMember
		guildId = message.guild!.id
		query = message.content
	} else if (interaction) {
		member = interaction.member as GuildMember
		guildId = interaction.guild!.id
		// assuming song discord option name to be 'song'
		query = interaction.options.get('song')
	}	
	// player will be created if it does not exits
	let player = client.manager.create({
		guild: member?.guild.id as string,
		voiceChannel: member?.voice.channel?.id,
		textChannel: textChannel as string
	})
	let res = await player.search(query as string, member)

	// only connect if not already playing
	try {
		if (player.state === 'DISCONNECTED') {
			player.connect()
		}
		player.queue.add(res.tracks[0])
		if (!player.playing && !player.paused && !player.queue.size) {
			player.play(res.tracks[0])
		}
		if (
			!player.playing &&
			!player.paused &&
			player.queue.totalSize === res.tracks.length
		)
		player.play(res.tracks[0]);
		let event = new Event('trackAdd')
		client.manager.emit('trackAdd', player)
		client.manager.addListener('trackAdd', (player: Player) => {
			console.log(player.guild)
		})
	} catch {
		if (message) {
			message.reply({
				content: 'Could not join the voice channel! An error occured!'
			}).then(reply => {
				setTimeout(() => {
					reply.delete()
				}, 3 * 1000)
			})
		}
	}
	if (message) {
		setTimeout(() => {
			message.delete()
		}, 1 * 1000)
	}
}

export {songRequest}