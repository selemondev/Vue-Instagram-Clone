<script setup>
import { auth, db } from "../firebaseConfig.js";
import { getDoc, doc } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const user = ref([]);
const currentUser = auth?.currentUser?.uid;
watchEffect(() => {
    getDoc(doc(db, "users", currentUser)).then((docSnap) => {
        if(docSnap.exists()) {
            user.value.push(docSnap.data())
        }})
});

const handleLogOut = async () => {
    await signOut(auth);
    router.push("/login")
}
</script>

<template>
<main>
    <div>
        <div v-for="currentUser in user" :key="currentUser.id" class="flex justify-between items-center">
      <div class="flex items-center justify-center">
          <img :src="currentUser.profile" :alt="currentUser.username" class="w-12 h-12 rounded-full">
        <div class="ml-2">
            <h4 class="font-bold">{{currentUser.username}}</h4>
            <p class="text-xs">@{{currentUser.username}}</p>
        </div>
      </div>
            <h3 class="text-[#0095F6] font-bold cursor-pointer" @click="handleLogOut()">Sign Out</h3>
        </div>
        </div>
</main>
</template>