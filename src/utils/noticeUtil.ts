// @ts-nocheck
/**
 * 日志工具类
 */
import { ElNotification } from 'element-plus'
import {GM_xmlhttpRequest} from "v$v";
import jquery  from 'jquery'
enum msgTypes {
    warn = 'warning',
    ok = 'success',
    err = 'error',
    info = 'info',
}

/**
 * 清空日志
 */
export function  clearLogHandle(){
    okMsg('日志已清空')
    window.logListSize = 0
    window.logList = []
    jquery('#el-log-main').empty()
}


/**
 * 筛选日志
 * @param loginInfo
 * @param type
 */
export function filterLogList(type: string) {
    // 先清空
    const logMain = jquery('#el-log-main')
    logMain.empty()
    // 获取全部日志
    let list:logInfo[] = window.logList
    // 筛选
    if (type !== 'all'){
        list = list.filter(i=>{return i.type === type})
    }
    // 批量插入
    const dDiv = jquery('<div></div>')
    list.forEach(i=>{
        dDiv.append(getPByLog(i))
    })
    // 添加到日志框中
    logMain.get()[0].append(dDiv.get()[0])

}



/**
 * 打印日志
 * @param msg 日志内容
 * @param type info err warn
 */
export function printLog(msg: any, type: string = 'info'){

    if (!window.logListSize){
        window.logListSize = 0
    }
    let pojo = {
        type: type,msg:msg,id: window.logListSize + 1
    }
    window.logListSize = pojo.id
    const logMain = jquery('#el-log-main').get()[0]
    let log = getPByLog(pojo)
    logMain.prepend(log[0])

    window.logList.unshift(pojo)

    if(type === 'err'){
        errMsg(msg)
    }

}

// 获取不同的日志样式
function getPByLog(log:logInfo){
    const msg = log.id + ' ' + log.msg
    let tex = jquery(`<p class="scrollbar-demo-item">${msg}</p>`)
    if (log.type === 'warn'){
        tex = jquery(`<p style="color:indianred">${msg}</p>`)
    }
    if (log.type === 'err'){
        tex = jquery(`<p style="color:darkred">${msg}</p>`)
    }
    tex.get()[0].style.whiteSpace = 'pre-wrap'
    return tex
}

// 成功类型的消息通知
export function okMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.ok)

}

// 成功类型的消息通知
export function successMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.ok)

}

// 普通类型的消息通知
export function infoMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.info)


}

// 错误类型的消息通知
export function errMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.err)


}

// 警告类型的消息通知
export function warnMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.warn)
}



function msgShow(title: string, msg: string, type: msgTypes) {
    if (msg) {
        ElNotification({
            title: title,
            message: msg,
            type: type,
        })
    } else {
        ElNotification({
            title: title,
            type: type,
        })
    }
}
