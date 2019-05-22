
<template>
    <div class="card">
        <h2>{{message.title}}</h2>
        <img v-bind:src="message.imgSrc" height="200" />
        <p>{{message.subtitle}}</p>
        <div>
            <a v-for="button in message.buttons" target="_new" v-bind:href="button.postback">
                {{button.text}}
            </a>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['message'],
        data() {
            return {

            };
        },
        methods: {
            
        }, 

    };

    
</script>

<style scoped>
    .card {
        color: black;
        -webkit-box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.75);
        box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.75);
        border-radius: 5px;
        padding: 15px;
    }
</style>
