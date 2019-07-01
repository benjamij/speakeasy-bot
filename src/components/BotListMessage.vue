
<template>
    <div class="message-bubble animated fadeIn">
        <div class="list">
            <h4>{{message.title}}</h4>
            <ul>
                <li v-for="list_item in message.items">{{list_item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['message'],
    };

    
</script>

<style scoped>

</style>
