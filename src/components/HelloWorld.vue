<script setup lang="ts">
import { ref } from 'vue';
import {okMsg } from '../utils/common'

defineProps<{ msg: string }>();

const count = ref(0);
const getElementVersion = () => {
  okMsg('成功','饿了么组件库成功')
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <el-button type="success" @click="getElementVersion">饿了么</el-button>
    <button type="button" class="bg-indigo-500 text-white rounded-lg-40">unocss</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
