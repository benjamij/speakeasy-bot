<template>
    <div class="message-bubble animated fadeIn">
        <a v-bind:href="message.url">{{message.text}}</a>
    </div>
</template>

<script>
    export default {
        props: ['message'],
    };
</script>
