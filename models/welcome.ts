import mongoose, { Schema } from "mongoose";

const reqString = {
	type: String,
	required: true
}

const welcomeSchema = new Schema({
	_id: reqString,
	welcomeChannelId: reqString,
	welcomeContent: reqString
})

const name = 'welcome-message'

export default mongoose.models[name] || mongoose.model(name, welcomeSchema, name)

