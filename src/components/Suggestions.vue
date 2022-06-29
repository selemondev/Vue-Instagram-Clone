<script setup>
import Profile from "../components/Profile.vue";
import Suggestion from "../components/Suggestion.vue";
import { ref } from "vue";
import { faker } from '@faker-js/faker';
const suggestions = ref([]);
function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
Array.from({ length: 5 }).forEach(() => {
  suggestions.value.push(createRandomUser());
});
</script>
<template>
<main class="py-6 px-6 mt-2 ml-1 w-96">
    <div>
        <Profile/>
    </div>
    <div class="mt-5 flex justify-between items-center">
        <p class="font-bold text-gray-400 text-base">Suggestions For You</p>
        <p class="text-black font-bold">See All</p>
    </div>
    <div v-for="suggestion in suggestions" :key="suggestion.id" class="mt-4 space-y-12">
        <Suggestion
        :id="suggestion.userId"
        :image="suggestion.avatar"
        :username="suggestion.username"
         />
    </div>
</main>
</template>