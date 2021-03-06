const speakerData = require('../data/speaker_data.js')
const speakerProfile = require('../components/speaker-profile')
const fs = require ('fs')
const path = require('path')

const validateSpeaker = (speaker) => {

	if (!speaker.speakerDetails.speakerName) throw new Error ('No Speaker Name')
	if (!speaker.slug) throw new Error ('No Speaker slug')	
	
	if (!speaker.talkDetails) { 
		speaker.talkDetails = { 
			talkTitle:"",  
			talkDesc:""
		}
	}

	return speaker;
}

const buildSpeakerProfiles = async () => {
	console.log("Begin processing ...");


	for (let speaker of speakerData) {
	  
	  	if (speaker.slug) {
	  		try {
	  			fs.writeFileSync(path.resolve('./static/speaker/',`${speaker.slug}.html`),speakerProfile(validateSpeaker(speaker)))
	  			console.log (speaker.slug)
	  		}
	  		catch (err) {
	  			console.log(`Error Reported: ${err}`)
	  		}
	  	} else {
	  		console.log ('Speaker slug not specified')
	  	}
		
	}
}

module.exports = buildSpeakerProfiles