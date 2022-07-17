<script setup>
import { SearchIcon, HomeIcon} from "@heroicons/vue/solid";
import { PlusCircleIcon, HeartIcon  } from "@heroicons/vue/outline";
import MessengerIcon from "../assets/messenger-Icon.svg";
import CompassIcon from "../assets/compass-Icon.svg";
import Icon from "../assets/dark-icon.svg";
import Instagram from "../assets/instagram-svg.svg";
import { auth, db } from "../firebaseConfig.js";
import { getDoc, doc } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { useModalStore } from "../stores/modal";
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
const modal = useModalStore();
const isOpen = ref(modal.isOpen);
function openModal() {
    modal.modalOpen(isOpen.value = true);
};
const handleLogOut = async () => {
    await signOut(auth);
    router.push("/login")
}
</script>
<template>
<header class="bg-white border-b border-gray-200 fixed w-full top-0 z-20 h-[66px] lg:h-[68px]">
    <div class="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto">
            
    <div class="hidden relative lg:inline w-28 cursor-pointer">
        <img :src="Instagram" alt="Instagram">
    </div>

    <div class="flex-shrink-0 h-9 w-9 cursor-pointer mt-3 lg:hidden">
        <img :src="Icon" alt="Icon">
    </div>

    <div class="hidden relative p-2 md:inline">
        <div class="flex items-center absolute inset-y-0 pl-3 cursor-pointer">
            <SearchIcon  class="h-5 w-5 text-gray-400"/>
        </div>
        <input type="text" placeholder="Search" class="w-full block bg-gray-100 py-2 rounded-md pl-10 appearance-none outline-none focus:ring-1 focus:ring-black">
    </div>


    <div class=" flex justify-center items-center space-x-4 mt-3 lg:mt-0">
        <div>
            <HomeIcon class="w-8 h-8"/>
        </div>
        <div class="hidden lg:block">
             <img :src="MessengerIcon" alt="Icon" class="h-6 w-6"/>
        </div>
        <div  @click="openModal()">
            <PlusCircleIcon class="w-8 h-8 hover:scale-110 ease-in duration-200"/>
        </div>

        <div class="hidden lg:block">
            <img :src="CompassIcon" alt="Compass" class="w-7 h-7">
        </div>

        <div class="hidden lg:block">
            <HeartIcon class="w-8 h-8"/>
        </div>

        <div v-for="currentUser in user" :key="currentUser.id" @click="handleLogOut()">
        <img :src="currentUser.profile" :alt="currentUser.username" class="w-8 h-8 rounded-full">
        </div>
    </div>
    </div>
</header>
</template>