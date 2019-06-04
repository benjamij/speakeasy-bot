import axios from 'axios';

/**
 * The SpeakEasy API uses the SpeakEasy middleware for intent detection.
 */
export default class SpeakEasyApi {

    constructor (agentName, baseUrl = 'https://speakeasy-backend.herokuapp.com:443/') {
        axios.defaults.baseURL = baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.agentName = agentName;
        this.session = null;
    }
    
    detectIntent (text, languageCode = 'en-US') {
        return axios
            .post(`/api/v1/intent/detect`, {
                text: text,
                language: languageCode,
                agent: this.agentName,
                session: this.session
            })
            .then((resp) => {
                this.session = resp.data.session;
                return resp;
            })
            .catch(error => console.log(error));
    }
}