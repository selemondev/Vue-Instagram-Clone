<script setup>
import Header from '../components/Header.vue';
import Feed from '../components/Feed.vue';
import Modal from '../components/Modal.vue';
</script>

<template>
<section class="min-h-screen overflow-y-scroll scrollbar-hide">
  <header>
  <Header/>
</header>
  <Feed/>
  <Modal/>
</section>
</template>
