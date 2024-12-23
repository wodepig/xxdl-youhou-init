<template>
    <el-divider content-position="left">日志展示</el-divider>

    <div class="bg-gray-200 w-100%  px-5 py-5 rounded-5">

        <el-button @click="filterLogList('all')">全部</el-button>
        <el-button @click="filterLogList('warn')" type="warning">警告</el-button>
        <el-button @click="filterLogList('err')" type="danger">错误</el-button>
        <el-button @click="clearLogHandle" type="info">清空</el-button>
        <el-scrollbar id="el-log-main" height="400px">
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { filterLogList, clearLogHandle } from '../utils/noticeUtil';
</script>