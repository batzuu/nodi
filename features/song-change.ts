import { Track } from "erela.js";
import { DisClient } from "..";
import { songCollection } from "..";

export default (client: DisClient) => {
	client.manager.on('queueEnd', (player, track) => {
		console.log('queue ended')
		console.log('abhi gaana kahatam hua')
		if (songCollection[player.guild].length == 0) {
			console.log('Gaana kahatam sab')
			return
		}
		songCollection[player.guild].shift()
		player.play(songCollection[player.guild][0] as Track)
	})
}