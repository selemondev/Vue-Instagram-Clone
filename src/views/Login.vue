<script setup>
import InstagramIcon from "../assets/Instagram.png";
import { auth,db } from "../firebaseConfig.js";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";
const loading = ref(false);
const router = useRouter();
const handleGoogleSignIn = async () => {
  loading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    await setDoc(doc(db, "users", response.user.uid), {
      id: response.user.uid,
      username: response.user.displayName,
      profile: response.user.photoURL,
    });
    loading.value = false;
    router.push("/");
  } catch(err) {
    console.log(err.message)
  }
}
</script>
<template>
<main  class="min-h-screen w-full grid-layout">
  <div>
   <img :src="InstagramIcon" alt="Icon" :class="[loading ? 'ml-6 w-28 h-28 mb-5 md:ml-10 md:w-32 md:h-32 ' : 'w-28 h-28 mb-5 ml-1 md:w-32 md:h-32 md:ml-4']">
    <button @click="handleGoogleSignIn" class="relative border border-[#E5515B] inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group md:px-14">
        <span class="w-48 h-48 rounded rotate-[-40deg] bg-[#E5515B] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-bold">
           {{ loading ? 'Signing In...' :  'Sign In'}}
        </span>
  </button>
  </div>
</main>
</template>