
const LINK_MSG_PAYLOAD_TYPE = 4;

export default class DialogFlowMessageParser {

    isCard(message) {
        return !!message['card'];
    }

    isSuggestion(message) {
        return !!message['payload'] && !!message['payload']['suggestions'];
    }

    isListMessage(message) {
        return !!message['payload'] && !!message['payload']['list_items'];
    }

    isLinkMessage(message) {
        return !!message['payload'] && message['payload']['payload_type'] === LINK_MSG_PAYLOAD_TYPE;
    }

    isText(message) {
        return !!message['text'] && !!message['text']['text'];
    }

    isError(message) {
        return !!message['errors'];
    }

    addMessageTo(target, messages) {
        messages.forEach(message => {
            if (this.isCard(message)) {
                const card = message['card'];
                target.push({
                    title: card['title'],
                    subtitle: card['subtitle'],
                    imgSrc: card['imageUri'],
                    buttons: card['buttons'],
                    sender: 'Bot',
                    type: 'card'
                })
            } else if (this.isText(message)) {
                message['text']['text'].forEach(messageContents => {
                    target.push({
                        text: messageContents,
                        sender: 'Bot',
                        type: 'text'
                    });
                })
            } else if (this.isSuggestion(message)) {
                message['payload']['suggestions'].forEach(suggestion => {
                    target.push({
                        text: suggestion['text'],
                        sender: 'Bot',
                        type: 'suggestion'
                    });
                })
            } else if (this.isError(message)) {
                target.push({errors: message.errors, type: 'error'});
            } else if (this.isListMessage(message)) {
                target.push({
                    title: message['payload']['list_title'],
                    items: message['payload']['list_items'],
                    sender: 'Bot',
                    type: 'list'
                });
            } else if (this.isLinkMessage(message)) {
                target.push({
                    text: message['payload']['text'],
                    url: message['payload']['url'],
                    type: 'link'
                })
            }
            console.log(this.isLinkMessage(message));
        });
        
    }
    
}
