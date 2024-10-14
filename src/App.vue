<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue';
import viteLogoUrl from './assets/vite.svg';
import vueLogoUrl from './assets/vue.svg';
import unocssLogoUrl from './assets/unocss.svg';
import jqLogoUrl from './assets/jquery.svg';
import elpLogoUrl from './assets/elp.svg';
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img :src="viteLogoUrl" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="vueLogoUrl" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <a href="https://element-plus.org/zh-CN/" target="_blank">
      <img :src="elpLogoUrl" class="logo element-plus" alt="element-plus logo" />
    </a>
    <a href="https://jquery.com/" target="_blank">
      <img :src="jqLogoUrl" class="logo jquery" alt="jquery logo" />
    </a>
    <a href="https://unocss.nodejs.cn/" target="_blank">
      <img :src="unocssLogoUrl" class="unocss" alt="unocss logo" />
    </a>
  
  </div>
  <HelloWorld msg="Vite + Vue + Elp + jQuery + unocss" />
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
