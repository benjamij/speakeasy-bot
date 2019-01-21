<template>
    <div id="app">
        <input
            v-model="message"
            type="text">
        <h2 class="message">{{ message }}</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'SpeakEasy!',
        };
    },
};
</script>

<style>
    .message {
        color: red;
    }
</style>
