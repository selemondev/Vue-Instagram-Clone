<script setup>
import Stories from "../components/Stories.vue";
import Suggestions from "./Suggestions.vue";
import Posts from "../components/Posts.vue";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { watchEffect, ref } from "vue";
const postsData = ref([]);
watchEffect(() => {
    const postReference = collection(db, "posts");
    const q = query(postReference, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(q, querySnapshot => {
        let posts = [];
        querySnapshot.forEach(doc => {
            posts.push({...doc.data(), id: doc.id})
        });
         postsData.value = posts;
    });
    return () => unsub();
});
</script>
<template>
<main class="grid grid-cols-1 -mt-5 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl">
<section class="col-span-2">
    <Stories/>
    <div v-for="post in postsData" :key="post.id">
    <Posts 
    :id="post.id" 
    :username="post.username" 
    :profile="post.profile" 
    :text="post.text" 
    :media="post.media" 
    :timeStamp="post.timeStamp"
    />
    </div>
</section>
<section class="hidden xl:inline-grid md:col-span-1">
   <main class="fixed top-16">
     <Suggestions/>
   </main>
</section>
</main>
</template>