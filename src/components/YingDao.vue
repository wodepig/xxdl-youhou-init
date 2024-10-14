<template>
    <el-button round @click="startHook">开始监听</el-button>
    <el-button round @click="cancelHook">取消监听</el-button>
  <el-input v-model="textarea" type="textarea" :min="2" ></el-input>
  <el-input v-model="textarea1" type="textarea" :min="2" ></el-input>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {ref} from "vue";
import {okMsg, warnMsg} from "../utils/common";

const textarea = ref('')
const textarea1 = ref('')
let  oldFetchGlo = null
// 必须要写
let oldFetch = fetch;
// 自己的hook
function  hookFetch (url, init) {
    // const  oldFetch = fetch
    //  console.log('开始处理hook')
    // fetch需要返回一个promise，所以这里我们new一个Promise返回，
    // 然后自行处理fetch的逻辑后resolve出去
    return new Promise((resolve, reject) => {

        // 这里我们使用fetch的原函数，
        // 通过apply更改了this指针至自身，并且传入了参数
        // 我们劫持函数的时候，
        // 由劫持函数调用原函数的过程中一定要使用call/apply进行修改this指针，
        // 以符合原来的调用过程。

        // 在then中则是我们处理response的过程
        oldFetch.apply(this, arguments).then(async (response) => {
            let hookFlagUrl =  isHook(arguments[0])
            if (hookFlagUrl !== ''){


                console.log('hookFetch处理响应',window['listenUrl'])
                const reader = response.body.getReader();
                const stream = new ReadableStream({
                    start(controller) {
                        function push() {
                            // "done"是一个布尔型，"value"是一个Unit8Array
                            reader.read().then((e) => {
                                let { done, value }=e;
                                // 判断是否还有可读的数据？
                                const data = new TextDecoder("utf-8").decode(value)
                                console.log('我再打印?',data)
                                if (data){
                                    let jsonObject = JSON.parse(data);
                                    parseLessonCatalog(jsonObject,hookFlagUrl)
                                }
                                if (done) {
                                    // 告诉浏览器已经结束数据发送
                                    controller.close();
                                    return;
                                }
                                // 取得数据并将它通过controller发送给浏览器
                                controller.enqueue(value);
                                push();
                            });
                        }
                        push();
                    }
                });
                let ret=new Response(stream, { headers: { "Content-Type": "text/html" } })
                resolve(ret)
            }else {
                resolve(response)
            }
        });
    });
}
// 开始hook
const startHook = () => {
    okMsg('开始hook')
    if (window['oldFetch']) {
        warnMsg('已经hook过了')
        return
    }
    let oldFetch = fetch;
    // 需要监听的url
    window['listenUrl'] = ['https://api.yingdao.com/api/college/v1/book/lessonCatalog?levelUuid', 'https://api.yingdao.com/api/college/v1/exam/quizInfo?quizUuid=']
    window.fetch = hookFetch
    window['oldFetch'] = oldFetch
    oldFetchGlo = window.fetch
    okMsg('hook成功')
}

// 取消hook
const cancelHook = () => {
    okMsg('取消hook成功')
    window.fetch = window['oldFetch']
    window['oldFetch'] = null
}

 // let oldFetch:any = fetch;



// 判断是不是被监听的url
const  isHook = (arg1:string):string => {
    const urls:string[] = window['listenUrl']
    for (let url of urls) {
        if (arg1.startsWith(url)){
            return url
        }
    }
    return  ''
}

// 解析数据
function parseLessonCatalog(data:any, url:string) {
    console.log('进入解析数据,',data)
    if (url === 'https://api.yingdao.com/api/college/v1/book/lessonCatalog?levelUuid'){
        let array = []
        const catalog = data.data.catalog[0].catalog
        for (let item of catalog) {
            array.push(item)
        }
        window.localStorage.setItem('lessonCatalog',JSON.stringify(array))
        textarea.value = JSON.stringify(array)
        // window.lessonCatalog = array
    }
    if (url === 'https://api.yingdao.com/api/college/v1/exam/quizInfo?quizUuid='){
        let array = []
        const questionList = data.data.questionList
        for (let item of questionList) {
            array.push(item)
        }
        window.localStorage.setItem('questionList',JSON.stringify(array))
        textarea1.value = JSON.stringify(array)
        // window.questionList = array
    }
}

</script>

<style scoped>

</style>
