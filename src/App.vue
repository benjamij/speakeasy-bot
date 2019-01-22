<template>
    <div id="app">
        <input
            v-model="message"
            type="text">
        <h2 class="message">{{ message }}</h2>
        <se-bot-launcher-button v-bind="{toggleChatbox}"></se-bot-launcher-button>
    </div>
</template>

<script>
    import BotLauncherComponent from './components/BotLauncher.vue';

    export default {
        data() {
            return {
                message: 'SpeakEasy!',
                chatBoxVisibility: false
            };
        },
        methods: {
            toggleChatbox: function (event) {
                this.chatBoxVisibility = !this.chatBoxVisibility;
            }
        },
        components: {
            'se-bot-launcher-button': BotLauncherComponent,
        }
    };
</script>

<style scoped>
    .message {
        color: red;
    }
</style>
