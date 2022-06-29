<script setup>
import Story from "../components/Story.vue";
import { ref } from "vue";
import { faker } from '@faker-js/faker';
const stories = ref([]);
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
Array.from({ length: 20 }).forEach(() => {
  stories.value.push(createRandomUser());
});
</script>
<template>
<main >
    <div class="flex space-x-2 p-6 bg-white border border-gray-200 mt-24 rounded-sm overflow-x-scroll lg:mt-28">
    <div v-for="story in stories" :key="story.id">
    <Story
    :id="story.userId"
    :image="story.avatar"
    :username="story.username"
     />
     </div>
    </div>
</main>
</template>