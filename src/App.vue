<script setup lang="ts">
// @ts-nocheck
import MainPage from './components/MainPage.vue';
import ConsoleShow from './components/ConsoleShow.vue';
import jquery from 'jquery'

import { ref, nextTick, onMounted, onUpdated } from 'vue'
import { getOneByClassLike, getOneById, getOneBySelect } from "./utils/jqUtil";
import { sleep } from "./utils/common"
import { okMsg } from "./utils/noticeUtil"

const mainPageShow = ref(false)



const sleepLock = async () => {
  await sleep(500)
  console.log('清除')
  window.lockInitSkip = false
}

// 初始化方法, 用于添加主按钮
const init = async () => {
  window.lockInit = true
  await sleep(600)
  const consoleBtn = getOneById('consoleBtn', '控制台按钮', false)
  if (consoleBtn) {
    window.lockInitSkip = true
    window.lockInit = false
    sleepLock()
    console.log('已初始化')
    return
  }
  let main: any = null
  console.log('重新已初始化')
  console.log(window.location.href)
  // 如果url等于https://www.baidu.com,寻找左上角列表
  if (window.location.href === 'https://www.baidu.com/') {
    main = getOneById('s-top-left', '左上角列表')
  } else {
    // 普通搜索界面
    main = getOneBySelect('.cr-title.c-gap-bottom-xsmall', '热榜')
  }
  // 初始化日志列表
  window.logList = []
  // 添加按钮
  let div = document.createElement("div");
  div.setAttribute('float', 'right')
  let consoleBtnHtml = '<button id="consoleBtn" class="" style="line-height:30px;font-weight: 600;padding-right: 1px;padding-top: 2px;padding-bottom: 2px;border-radius: 30px; background-color:#0cc1ff; color:#ffffff">点这里</button>'
  div.innerHTML = consoleBtnHtml
  if (main) {
    main.append(div)
  }
  // 为按钮添加点击事件监听
  jquery('#consoleBtn').on('click', function () {
    // 在这里添加点击事件的处理逻辑
    changeMainPage()
  });
  // window.changeMainPage = changeMainPage
  window.lockInit = false
}

// 展示控制台
const changeMainPage = () => {
  mainPageShow.value = !mainPageShow.value
}

// 监听地址栏改变的相关方法
var _wr = function (type) {
  var orig = history[type];
  return function () {
    // window.lockInit = true
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');
onMounted(() => {
  init()
  window.addEventListener('replaceState', function (e) {
    if (window.lockInit || window.lockInitSkip) {
      return
    }
    console.log('THEY DID IT AGAIN! replaceState 111111');
    init()
  });
  window.addEventListener('popstate', function (event) {
    if (window.lockInit || window.lockInitSkip) {
      return
    }
    init()
  })
  window.addEventListener('pushState', function (e) {
    if (window.lockInit || window.lockInitSkip) {
      return
    }
    console.log('THEY DID IT AGAIN! pushState 2222222');
    init()
  });
})



</script>

<template>
  <el-dialog v-model="mainPageShow" title="控制台(vip)_0.0.1" width="1000" draggable>

    <div v-show="mainPageShow" class="w-100%">
      <el-row>
        <el-col :span="11">
          <MainPage></MainPage>
        </el-col>
        <el-col :span="1">
          <el-divider style="height: 100%;" direction="vertical" />
        </el-col>
        <el-col :span="11">
          <ConsoleShow></ConsoleShow>
        </el-col>
      </el-row>


    </div>


  </el-dialog>
</template>



<style scoped></style>
