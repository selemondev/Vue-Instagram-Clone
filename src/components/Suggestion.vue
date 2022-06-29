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
    <div class="flex justify-between items-center">
      <div class="flex items-center justify-center">
          <img :src="props.image" :alt="props.username" class="w-12 h-12 rounded-full">
        <div class="ml-2">
            <h4 class="font-bold text-xs hover:underline cursor-pointer">{{props.username}}</h4>
            <p class="text-xs mt-1">@{{props.username}}</p>
        </div>
      </div>
            <h3 class="text-[#0095F6] font-bold cursor-pointer">Follow</h3>
        </div>
    </div>
</main>
</template>