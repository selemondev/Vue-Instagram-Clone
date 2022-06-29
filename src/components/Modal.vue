<script setup>
import { ref, watchEffect } from 'vue';
import { useModalStore } from "../stores/modal";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { PhotographIcon, XIcon } from '@heroicons/vue/solid';
import { EmojiHappyIcon } from "@heroicons/vue/outline"
import { getDoc, doc, addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { ref as storageRef, getDownloadURL, uploadBytes} from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css";
const user = ref([]);
const inputEl = ref("");
const showEmojis = ref(false);
const loading = ref( false);
const selectedImage = ref("");
const blob = ref("");
const currentUser = auth?.currentUser?.uid;
const current = auth?.currentUser;
const modal = useModalStore();
const isOpen = ref(modal.isOpen);
function closeModal() {
    modal.modalClose(isOpen.value = false)
};
watchEffect(() => {
    getDoc((doc(db, "users", currentUser))).then((docSnap) => {
        if(docSnap.exists()) {
            user.value.push(docSnap.data())
        }
    })
});
function showEmoji(emoji) {
        inputEl.value += emoji.i;
};
const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    selectedImage.value = file;
    blob.value = URL.createObjectURL(file);
};
function removeSelectedImage() {
    selectedImage.value = null;
};
async function sendPost() {
    loading.value = true;
    let sentImage;
      const imageReference = storageRef( storage,`images/${new Date().getTime()} - ${selectedImage.name}`);
      const snap = await uploadBytes(imageReference, selectedImage.value);
      const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
      sentImage = downloadImageUrl
    await addDoc(collection(db, "posts"), {
        id: current.uid,
        username: current.displayName,
        profile: current.photoURL,
        text: inputEl.value,
        media: sentImage || "",
        timeStamp: serverTimestamp(),
    });
    loading.value = false;
    setTimeout(() => {
        inputEl.value = "";
        selectedImage.value = "";
    }, 1000);
};
</script>
<template>
  <Teleport to="#modal">
  <TransitionRoot appear :show="modal.isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
            <DialogTitle>
              <div class="absolute right-5" @click="closeModal()">
                <XIcon class="w-5 h-5 text-gray-600 hover:text-black"/>
              </div>
            </DialogTitle>
              <div :class="[loading ? ' flex overflow-y-scroll scrollbar-hide border-b dark:border-gray-600 border-gray-300 p-3 space-x-3 opacity-60' : 'flex overflow-y-scroll scrollbar-hide border-b dark:border-gray-600 border-gray-300 p-3 space-x-3']">
    <div>
        <img :src="auth.currentUser.photoURL" class="h-11 w-11 rounded-full mr-4" />
    </div>
    <div :class="[ showEmojis ? 'h-72 w-full' : 'w-full divide-y divide-gray-200']">
        <div>
            <textarea v-model="inputEl" placeholder="Write a caption" class="w-full min-h-[52px] text-lg tracking-wide bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white text-black" />
        <div v-if="selectedImage">
             <div class="relative">
                <div class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center justify-center top-1 left-1">
                    <XIcon @click="removeSelectedImage()" class="h-5 w-5 text-white"/>
                </div>
                <img :src="blob" alt="image" width="200" height="200">
            </div>
        </div>
        </div>

        <div v-if="!loading">
        <div class="flex justify-between items-center pt-2">
            <div class="flex items-center space-x-1">
                <div>
                   <label for="fileUpload">
                     <PhotographIcon class="icon-style cursor-pointer text-[#1d9bf0] h-[22px]"/>
                   </label>
                    <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload" accept="image/*" />
                </div>

              <div class="cursor-pointer" @click="showEmojis = !showEmojis">
                <EmojiHappyIcon class="text-gray-500 w-6 h-6" />
              </div>

              <div v-if="showEmojis" class="absolute top-[145px] left-6">
               <XIcon v-if="selectedImage" @click="showEmojis = !showEmojis" class="h-5 w-5 text-black"/>
                <EmojiPicker @select="showEmoji"/>
              </div>
            </div>
             <div>
                <button :disabled="!inputEl" class="bg-[#E5515B] text-white rounded-full shadow-md hover:bg-[#e93a46] disabled:hover:bg-[#E5515B] disabled:opacity-50 disabled:cursor-default px-4 py-1.5 font-bold" @click="sendPost()">Post</button>
              </div>
        </div>
        </div>
    </div>
</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </Teleport>
</template>