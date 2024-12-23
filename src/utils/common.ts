// @ts-nocheck
/**
 * 通用的工具类
 */

import { ElNotification } from 'element-plus'
import {GM_xmlhttpRequest} from "v$v";
import {errMsg} from "./noticeUtil";

enum msgTypes {
    warn = 'warning',
    ok = 'success',
    err = 'error',
    info = 'info',
}

/**
 * 强制停止
 * @param stop 
 */
export function needStop(stop: boolean) {
    if (stop){
        errMsg('停止了')
        throw Error('手动停止')
    }
}

export function sleep(time: number){
    const rate = window['sleepRate'] ? window['sleepRate'] : 3
    time = rate * time
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('')
        }, time)
    })
}

/**
 * get请求
 * @param url 请求地址
 * @returns 
 */
export function GmGet(url:string){
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url:url,
            method :"GET",
            onload:function(xhr){
                resolve(xhr.responseText)
            }
        });
    })
}

/**
 * post请求
 * @param url 
 * @param body 
 * @returns 
 */
export function GmPost(url:string,body:object = {}){
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url:url,
            method :"POST",
            headers:{
                'Content-Type': "application/json"
            },
            data: JSON.stringify(body),
            onload:function(xhr){
                resolve(xhr.responseText)
            }
        });
    })
}

