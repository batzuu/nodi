import { Track } from "erela.js";
import { DisClient } from "..";
import { songCollection } from "..";

export default (client: DisClient) => {
	client.manager.on('queueEnd', (player) => {
		songCollection[player.guild].shift()
		if (songCollection[player.guild].length == 0) {
			console.log('Gaana kahatam sab')
			return
		}
		player.play(songCollection[player.guild][0] as Track)
	})
}