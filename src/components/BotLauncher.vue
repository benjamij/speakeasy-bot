
<template>
    <div class="launcher-icon-container">
        <div class="launcher-icon" v-on:click="toggleChatbox" >
        </div>
    </div>
</template>

<script>
    export default {
        props: ['toggleChatbox'],
    };
</script>

<style scoped>
    .launcher-icon-container {
        position: fixed;
        bottom: 0;
        right: 0;
    }

    .launcher-icon-container span {
        max-width: 130px;
    }

    @keyframes float {
        0% {
            transform: translatey(0px);
        }
        50% {
            transform: translatey(-20px);
        }
        100% {
            transform: translatey(0px);
        }
    }

    .launcher-icon-container .launcher-icon {
        animation: float 6s ease-in-out infinite;
        background-image: url('../assets/img/launcher-icon.png');
        background-size: 130px 130px;
        background-repeat: no-repeat;
        width: 130px;
        height: 130px;
    }

    .launcher-icon-container .launcher-icon:hover {
        animation: none;
        cursor: pointer;
    }
</style>


