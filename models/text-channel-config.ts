import mongoose, { Schema } from "mongoose";

const reqString = {
	type: String,
	required: true
}

const tccSchema = new Schema({
	_id: reqString,
	welcomeChannelId: { type: String },
	musicChannelId: { type: String },
	welcomeContent: { type: String }
})

const name = 'text-channel-config'

export default mongoose.models[name] || mongoose.model(name, tccSchema, name)

