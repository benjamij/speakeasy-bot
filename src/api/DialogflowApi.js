import axios from 'axios';
import { KJUR } from 'jsrsasign'

const creds = require('../assets/key.json')  

/**
 * The Dialogflow API should only be used for local testing or as a fall-back for
 * demonstrations. Any production bots should be using the middleware.
 */
export default class DialogFlowApi {

    constructor (agentName, baseUrl = 'https://dialogflow.googleapis.com/') {
        axios.defaults.baseURL = baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        // Generate random session ID.
        const sessionId = Math.floor(Math.random() * 10000) + Math.floor(Date.now() / 1000);
        this._session = `projects/${agentName}/agent/sessions/${sessionId}`;

        // Generate access token.
        this._generateToken();

        // Generate new token every hour.
        setInterval(this._generateToken, 3600000);
    }
    
    detectIntent (text, languageCode = 'en-US') {
        if (!this.token) {
            setTimeout(this.detectIntent, 500, text, languageCode);
            return;
        }
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        return axios
            .post(`/v2/${this._session}:detectIntent`, {
                queryInput: {
                    text: {
                        text,
                        languageCode
                    }
                }
            })
            .catch(error => console.log(error));
    }

    _generateToken () {
        const header = {
            alg: 'RS256',
            typ: 'JWT',
            kid: creds.private_key_id
        }
  
        const payload = {
            iss: creds.client_email,
            sub: creds.client_email,
            iat: KJUR.jws.IntDate.get('now'),
            exp: KJUR.jws.IntDate.get('now + 1hour'),
            aud: 'https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions'
        }
        
        const stringHeader = JSON.stringify(header)
        const stringPayload = JSON.stringify(payload)
        this.token = KJUR.jws.JWS.sign('RS256', stringHeader, stringPayload, creds.private_key)
    }
}
