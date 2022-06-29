<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})
</script>
<template>
<main>
    <div>
        <img :src="props.image" :alt="props.username" class="w-12 h-12 hover:scale-105 ease-in duration-200 rounded-full object-contain border-2 border-red-500 cursor-pointer">
        <p class="text-center w-12 text-xs truncate">{{props.username}}</p>
    </div>
</main>
</template>