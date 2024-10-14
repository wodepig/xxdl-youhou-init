<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue';
import YingDao from './components/YingDao.vue';
import viteLogoUrl from './assets/vite.svg';
import vueLogoUrl from './assets/vue.svg';
import unocssLogoUrl from './assets/unocss.svg';
import jqLogoUrl from './assets/jquery.svg';
import elpLogoUrl from './assets/elp.svg';
</script>

<template>
 <YingDao/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
