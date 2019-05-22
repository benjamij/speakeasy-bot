

export default class DialogFlowMessageParser {

    isCard(message) {
        return !!message['card'];
    }

    isSuggestion(message) {
        return !!message['payload'] && !!message['payload']['suggestions'];
    }

    isText(message) {
        return !!message['text'] && !!message['text']['text'];
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
            }
        });
        
    }
    
}
