<script setup lang="ts">
import $  from 'jquery';
import { ref } from 'vue';
import {okMsg, warnMsg } from '../utils/common'
import {getById } from '../utils/jqUtil'
 
defineProps<{ msg: string }>();

const count = ref(0);
const getElementVersion = () => {
  okMsg('成功','饿了么组件库成功')
}
const getUnoCssTest = () => {
  warnMsg('成功','这这个按钮是unocss的样式效果')
}
const getJqTest = () => {
  //getById('ele-plus')
 console.log($('#ele-plus')[0]);
 
 okMsg('查找成功','看控制台')
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <el-button id="ele-plus" type="success" @click="getElementVersion">饿了么</el-button>
    <button type="button" @click="getUnoCssTest" class="bg-indigo-500 text-white rounded-lg-40">unocss</button>
    <el-button type="warn" @click="getJqTest">jQuery</el-button>
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
