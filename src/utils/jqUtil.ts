// @ts-nocheck
import $  from 'jquery'
import {errMsg} from "./noticeUtil";
export function getById(id: string){
    console.log($('#' + id));

}

/**
 * 获取一个包含类名className的元素
 * @param className 类名,不要加.
 * @param eleName 元素中文名
 * @param needThrow 是否需要提示错误
 */
export function getOneByClassLike(className: string, eleName: string = '',needThrow: boolean = true) {
    const eles =   $(`[class*=${className}]`)
    if (eles.length === 1){
        return eles[0]
    }
    if (needThrow){
        errMsg('元素获取失败',eleName)
        throw new Error('元素获取失败')
    }

}

/**
 * 获取一个id的元素
 * @param id
 * @param eleName
 * @param needThrow
 */
export function getOneById(id: string, eleName: string = '',needThrow: boolean = true) {
    const eles =   $(`#${id}`)
    if (eles.length === 1){
        return eles[0]
    }
    if (needThrow){
        errMsg('元素获取失败',eleName)
    }else{
        return null
    }
}

export function getOneBySelectList(xpath:string, eleName: string = '', needThrow: boolean = true){
    const eles =   $(xpath)
    if (eles.length === 0){
        return []
    }else {
        return eles
    }
}

export function getOneBySelect(xpath:string, eleName: string = '', needThrow: boolean = true){
    const eles =   $(xpath)
    if (eles.length === 1){
        return eles[0]
    }
    if (needThrow){
        errMsg('元素获取失败',eleName)
    }else{
        return null
    }
}
