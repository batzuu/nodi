import mongoose, { Schema } from "mongoose";

const reqString = {
	type: String,
	required: true
}

const mccSchema = new Schema({
	_id: reqString,
	musicChannelId: { type: String },
	musicMessageId: { type: String }
})

const name = 'music-channel-config'

export default mongoose.models[name] || mongoose.model(name, mccSchema, name)
