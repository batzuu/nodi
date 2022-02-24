import DJS, { TextChannel, WelcomeChannel } from 'discord.js'
import { ICommand } from "wokcommands";
import mccSchema from '../models/music-channel-config'

export default {
	category: 'Music',
	description: 'Setup the NodiMusic Channel',

	slash: true,
	testOnly: true,

	callback: async ({ interaction, guild }) => {
		// If used in dms
		if (!guild) {
			interaction.reply({
				content: 'Command only availaible on servers',
			})
			return
		}
		interaction.deferReply()
		let musicChannel = await guild.channels.create('nodi-music', {
			topic: 'Text channel for nodi music bot',
			position: 2
		}) as TextChannel

		let targetMessage = await musicChannel.send({
			content: 'This message will be edited with song details'
		})

		await mccSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, musicChannelId: musicChannel.id, musicMessageId: targetMessage.id}, {upsert: true})

		interaction.reply({
			content: 'Music-channel setup complete',
			ephemeral: true,
		})
	}
} as ICommand