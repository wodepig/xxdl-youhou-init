
/**
 * 通知工具类
 */

import { ElNotification } from 'element-plus'

enum msgTypes {
    warn = 'warning',
    ok = 'success',
    err = 'error',
    info = 'info',
}

export function okMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.ok)

}
export function successMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.ok)

}

export function infoMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.info)


}

export function errMsg(title: string, msg: string = '') {
    msgShow(title, msg, msgTypes.err)


}




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