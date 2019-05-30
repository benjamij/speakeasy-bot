
<template>
    <div class="bot-container animated" v-bind:class="{ lightSpeedOut: !isVisible, lightSpeedIn: isVisible }">
        <div class="chatbox">
            <div class="chatbox-header-container">
                <div class="chatbox-header">
                    <div class="avatar">
                        <span class="avatar-text">{{header}}</span>
                    </div>
                    <span class="close-icon" v-on:click="close"></span>
                </div>
                <div class="subtext">
                    {{info}}
                </div>
            </div>

            <div class="chatbox-message-container" ref="chatbox-message-container">
                <div v-for="message in messages" class="message">
                    <div
                        v-if="message.type !== 'card'"
                        class="message-bubble animated fadeIn"
                        v-bind:class="{ me: message.sender === 'Me' }">
                        {{message.text}}
                    </div>
                    <se-bot-card-message 
                        v-if="message.type === 'card'"
                        v-bind="{message}">
                    </se-bot-card-message>>
                </div>
                <div class="message">
                    <div class="message-bubble typing animated fadeIn" v-if="isLoading">
                        <span>...</span>
                    </div>
                </div>
            </div>

            <div class="chatbox-input">
                <hr/>
                <input
                    v-model="message"
                    v-on:keyup.enter="sendMsg"
                    type="text"
                    placeholder="Digite sua mensagem...">
                <div class="se-button" v-on:click="sendMsg"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import DialogFlowMessageParser from '../services/DialogflowMessageParser';
    import BotCardMessageComponent from './BotCardMessage.vue';
import { setTimeout } from 'timers';

    const messageParser = new DialogFlowMessageParser();
    export default {
        props: ['toggleChatbox', 'send' ,'header', 'info', 'messages'],
        data() {
            return {
                message: null,
                isLoading: false,
                isVisible: true
            };
        },
        methods: {
            sendMsg: function (event) {
                if (!this.message) return;
                const promise = this.send(event, this.message);
                this.isLoading = true;
                promise.then((response) => {
                    this.isLoading = false;
                    const fulfillmentMessages = response.data.queryResult.fulfillmentMessages;
                    messageParser.addMessageTo(this.messages, fulfillmentMessages);
                    this.scrollToBottom();
                });
                this.scrollToBottom();
                this.message = null;
            },
            scrollToBottom: function () {
                this.$refs["chatbox-message-container"].scrollTop = this.$refs["chatbox-message-container"].scrollHeight;
            },
            close: function () {
                this.isVisible = false;
                setTimeout(this.toggleChatbox, 1000);
            }
        }, 
        updated () {
            this.scrollToBottom();
        },
        components: {
            'se-bot-card-message': BotCardMessageComponent,
        }
    };

    
</script>

<style scoped>
    .bot-container {
        font-family: 'Raleway', sans-serif;
        position: fixed;
        right: 65;
        bottom: 105;
        z-index: 9999;
        background-color: rgb(133, 199, 230);
        -webkit-box-shadow: -8px 10px 29px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -8px 10px 29px 0px rgba(0,0,0,0.75);
        box-shadow: -8px 10px 29px 0px rgba(0,0,0,0.75);
        border-radius: 20px;
    }

    .chatbox-input {
        position: absolute;
        width: 100%;
        bottom: 20;
    }

    .close-icon {
        float: right;
        width: 100px;
        height: 100px;
        margin-right: -40px;
        cursor: pointer;
        background-image: url('../assets/img/close.png');
        background-size: 40px 40px;
        background-repeat: no-repeat;
    }

    .close-icon:hover {
        float: right;
        background-image: url('../assets/img/close-hover.png');
    }

    .avatar {
        margin: 15px;
        display: inline-block;
        background-image: url('../assets/img/bot-avatar.png');
        background-repeat: no-repeat;
        width: 80px;
        height: 80px;
        background-size: 80px 80px;
    }

    .avatar-text {
        padding-left: 100px;
        padding-top: 40px;
    }

    .subtext {
        margin-top: 20px;
        padding: 15px;
    }

    .chatbox-input input {
        border: none;
        line-height: 30px; 
        font-size: 22px;
        padding: 10px;
        width: 100%;        
    }

    .chatbox-input input:focus{
        outline: none;
    }

    .chatbox-input .se-button {
        float: right;
        background-image: url('../assets/img/send-button.png');
        background-size: 120px 120px;
        cursor: pointer;
        background-repeat: no-repeat;
        width: 120px;
        height: 120px;
        position: absolute;
        right: -30px;
        top: -20px;
    }

    .chatbox-input .se-button:hover {
        background-image: url('../assets/img/send-button-hover.png');
        cursor: pointer;
        /* animation: zoominoutsinglefeatured 2s forwards; */
    }

    @keyframes zoominoutsinglefeatured {
        0% {
            transform: scale(0.5,0.5);
        }
        50% {
            transform: scale(1.2,1.2);
        }
        100% {
            transform: scale(1,1);
        }
    }

    .chatbox {
        width: 394px;
        height: 520px;
        background-color: white;
        border-radius: 20px;
        color: white;
    }

    .chatbox-header {
        background-color: rgb(133, 199, 230);
        width: 394px;
        height: 74px;
        font-size: 40px;
    }

    .chatbox-header-container {
        margin-top: 15px;
        background-color: rgb(133, 199, 230);
    }

    .me {
        float: right;
        margin-right: 10px;
        background-color: rgb(133, 199, 230) !important;
        color: white !important;
    }

    .chatbox-message-container {
        overflow-y: scroll;
        max-height: 53%;
        min-height: 53%;
        background: white;
        margin-bottom: 100px;
    }

    .message {
        overflow: hidden;
        padding: 15px;
    }

    .message-bubble {
        display: inline-block;
        font-size: 18px;
        bottom: 0px;
        color: white;
        margin-top: 25px;
        margin-left: 10px;
        border-radius: 5px;
        margin: 15px;
        padding: 12px;
        align-items: center;
        justify-content: center;
        color: black;
        background-image: radial-gradient(to bottom, #2C2A2A 0%, #212020 100%);;
        background-color: rgb(240, 242, 246);
        border-radius: 8px;
        box-shadow: 0 16px 24px -8px rgba(0, 0, 0, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.5);
    }

    @keyframes blink {
        0% {
            opacity: .2;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: .2;
        }
    }

    .typing {
        color: black;
    }
    .typing span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    }

    .typing span:nth-child(2) {
        animation-delay: .2s;
    }

    .typing span:nth-child(3) {
        animation-delay: .4s;
    }
</style>
