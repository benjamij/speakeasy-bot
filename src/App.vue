<template>
    <div id="app">
        <se-bot-chatbox
            v-if="chatBoxVisible"
            v-bind="{toggleChatbox, send}"
            header="Dúvidas?"
            v-bind:messages="messages"
            info="Não hesite em me mandar uma mensagem por aqui, estou à disposição para lhe ajudar">
        </se-bot-chatbox>
        <se-bot-launcher-button v-bind="{toggleChatbox, chatBoxVisible}"></se-bot-launcher-button>
    </div>
</template>

<script>
    import BotLauncherComponent from './components/BotLauncher.vue';
    import BotChatboxComponent from './components/BotChatbox.vue';
    import DialogFlowApi from './api/DialogflowApi';
    import SpeakEasyApi from './api/SpeakEasyApi';

    const api = new SpeakEasyApi('newagent-penpyf', process.env.API_KEY);

    export default {
        data() {
            return {
                chatBoxVisible: false,
                messages: []
            };
        },
        methods: {
            toggleChatbox: function (event) {
                this.chatBoxVisible = !this.chatBoxVisible;
            },

            send: function(event, message) {
                this.messages.push({text: message, sender: 'Me', type: 'text'});
                return api.detectIntent(message);
            }
        },
        components: {
            'se-bot-launcher-button': BotLauncherComponent,
            'se-bot-chatbox': BotChatboxComponent,
        }
    };
</script>

<style scoped>
    .message {
        color: red;
    }
</style>
