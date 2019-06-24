import axios from 'axios';

/**
 * The SpeakEasy API uses the SpeakEasy middleware for intent detection.
 */
export default class SpeakEasyApi {

    constructor (agentUuid) {
        axios.defaults.baseURL = process.env.API_URL;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.session = null;
        this.agentUuid = agentUuid;
    }
    
    detectIntent (text, languageCode = 'en-US') {
        return axios
            .post(`/api/v1/intent/detect`, {
                text: text,
                language: languageCode,
                agent: this.agentUuid,
                session: this.session
            })
            .then((resp) => {
                this.session = resp.data.data.session;
                return resp.data;
            })
            .catch(error => console.log(error));
    }
}
