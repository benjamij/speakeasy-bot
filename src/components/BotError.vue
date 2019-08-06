<template>
    <div class="error">
        <p v-for="error in message.errors">{{error}}</p>
    </div>
</template>

<script>
    export default {
        props: ['message'],
    };
</script>

<style scoped>
    .error {
        background: red;
        color: white;
    }
</style>
