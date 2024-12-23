<template>
    <div class=" flex-row w-full">
        <el-divider content-position="left">基本信息</el-divider>
        <div class=" bg-blue-300 px-5 py-5 rounded-l-20">
            <el-row>
                <el-button v-if="!forceStop" round type="warning" @click="forceStop = !forceStop">暂停</el-button>
                <el-button v-if="forceStop" round type="success" @click="forceStop = !forceStop">继续</el-button>
                <el-button round type="danger" @click="debugInfo = !debugInfo">调试</el-button>
            </el-row>
            <el-row class="px-5 py-5">
                <el-input v-model="configInfo.key" style="max-width: 600px" placeholder="请输入密钥">
                    <template #prepend>密钥:</template>
                </el-input>
            </el-row>
            <el-row class="px-5 py-5  items-center">
                <p class="color-black text-center font-bold">等待倍率: </p>
                <el-input-number v-model="configInfo.sleepRate" :min="1" :max="10">
                </el-input-number>
                <el-button round type="danger" @click="setSleepRate">设置</el-button>
            </el-row>

        </div>
        <el-divider content-position="left">功能区1</el-divider>
        <el-divider v-show="debugInfo" content-position="left">调试区</el-divider>
        <div v-show="debugInfo" class=" bg-red-300 px-5 py-5 rounded-l-20">
            <el-row class="flex ">
                <el-button round @click="printLog('一条普通日志')">普通日志</el-button>
                <el-button round @click="printLog('一条错误日志', 'err')">错误日志</el-button>
                <el-button round @click="errMsg('错误消息')">错误消息</el-button>
            </el-row>
        </div>
        <el-divider content-position="left">一言句子</el-divider>
        <div class=" bg-blue-500 px-5 py-5 rounded-l-20">
            <el-row>
                <el-button round type="success" @click="movieSentence">影视句子</el-button>
                <el-button round type="success" @click="randomSentence">随机句子</el-button>
                <el-button round type="success" @click="random3Sentence">循环三次(测等待倍率)</el-button>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';


import { getOneBySelect, getOneBySelectList } from "../utils/jqUtil";
import { GmGet, GmPost, needStop, sleep } from "../utils/common";
import { errMsg, okMsg, printLog } from "../utils/noticeUtil";
const debugInfo = ref(false)
const forceStop = ref(false)
const configInfo = ref({
    key: '123456',
    url: 'https://api.qjqq.cn/api/Yi',
    sleepRate: 3
})

// 设置等待倍率
const setSleepRate = () => {
    if (configInfo.value.sleepRate && configInfo.value.sleepRate > 0) {
        window['sleepRate'] = configInfo.value.sleepRate
    } else {
        window['sleepRate'] = 3
    }
    okMsg('设置成功')
}

// 影视句子
const movieSentence = async () => {
    let url = configInfo.value.url + '?c=h'
    let resp = await GmGet(url)
    let json = JSON.parse(resp)
    printLog(json.hitokoto)
}


// 随机句子
const randomSentence = async () => {
    let url = configInfo.value.url + '?c=h'
    let resp = await GmGet(url)
    let json = JSON.parse(resp)
    printLog(json.from + ':' + json.hitokoto)
}

// 循环三次
const random3Sentence = async () => {
    for (let index = 0; index < 3; index++) {
        await randomSentence()
        await sleep(1000)
    }
}

</script>

<style scoped></style>
