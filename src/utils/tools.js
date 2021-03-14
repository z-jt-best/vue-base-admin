/*
 *@param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export function debounce(fn, delay = 500) {
    var timer = null // 声明计时器
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * 十六进制颜色值转rgb值
 * 例如：colorRgb(#ee9922) = {r:238,g:153,b:34}
 */
export function colorRgb(sColor) {
    if (sColor) {
        sColor = sColor.toLowerCase()
    }
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < sColor.length; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }

        return {
            r: sColorChange[0],
            g: sColorChange[1],
            b: sColorChange[2]
        }
    }
    return {}
}

/**
 * 获取请求头中的文件名
 * @param {string} name
 * @returns {Boolean}
 */
export function getFileName(name) {
    let result = null
    if (name && /filename=.*/gi.test(name)) {
        result = name.match(/filename=.*/gi)
        return decodeURI(result[0].split('=')[1])
    }
    return 'file'
}

/**
 * 将带小数点的数字切割成整数和小数部分
 * @param text {String||Number}   要传文本
 * @param digits {Number}   默认是2位小数点
 * @return {Array}   返回一个数组，Array[0]是整数部分，Array[1]是小数部分，
 *  * 用法：import { formatNumber } from '@/utils/utils.js';
 *          data: Money: formatNumber,
 *          {{ Money(cash)[0] }}.{{ Money(cash)[1] }}
 */
export function formatNumber(text = 0, digits = 2) {
    if (!text) {
        text = 0
    }
    if (!(text instanceof Number)) {
        text = Number(text)
    }

    text = text.toFixed(digits).toString()
    if (text.indexOf('.') == -1) {
        text = text + '.00'
    }
    return text.indexOf('.') != -1 ? text.split('.') : text.join('')
}

/*
 *@param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export function createUUID() {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
export function deepClone(obj, cache = []) {
    // typeof [] => 'object'
    // typeof {} => 'object'
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
    /**
     * 类似下面这种
     * var a = {b:1}
     * a.c = a
     * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
     */
    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache)
    })

    return copy
}

/**
 * 两个对象的深度合并
 * @param {*} obj1 拷贝对象1
 * @param {*} obj2 拷贝对象2
 */
export function deepMerge(obj1, obj2) {
    let key
    for (key in obj2) {
        // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
        // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
        obj1[key] =
            obj1[key] && obj1[key].toString() === '[object Object]' && obj2[key] && obj2[key].toString() === '[object Object]'
                ? deepMerge(obj1[key], obj2[key])
                : (obj1[key] = obj2[key])
    }
    return obj1
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function getQueryParam() {
    return { ...arguments }
}

/**
 * 交换数组两个下标元素的位置
 * @param {Array} arr
 * @param {String} index1
 * @param {String} index2
 * @returns {Array}
 * 用法：//点击上移 clickUp(index){ this.swapArray(this.tableData, index-1, index); },
        //点击下移 clickDown(index){ this.swapArray(this.tableData, index, index+1); },
 */
export function swapArray(arr, oldIndex, newIndex) {
    arr[oldIndex] = arr.splice(newIndex, 1, arr[oldIndex])[0]
    return arr
}

/**
 * 递归构建树方法
 * data：需要递归的数组
 * children：需要将空的数组子元素设为undefined的子数组名字
 */
export function getTreeData(data, children = 'children') {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
        if (data[i][children] == 'null' || data[i][children].length < 1) {
            // children若为空数组，则将children设为undefined
            data[i][children] = undefined
        } else {
            // children若不为空数组，则继续 递归调用 本方法
            getTreeData(data[i][children])
        }
    }
    return data
}

/**
 * 将一维数组拆分为二维数组
 * arr：需要拆分的一维的数组
 * size：需要将空的数组子元素设为undefined的子数组名字
 */
export function arrToTwoDim(arr, size) {
    var result = []

    arr.forEach((item, index) => {
        const page = Math.floor(index / size)
        if (!result[page]) {
            result[page] = []
        }
        result[page].push(item)
    })
    return result
}

import { Message } from 'element-ui'
//单例模式抽象，分离创建对象的函数和判断对象是否已经创建(第二版单例)
const createSingle = function (fn) {
    let result
    return function () {
        return result || (result = new fn(...arguments))
    }
}

// 提示框(单例模式)
class MessageModal {
    constructor() {
        this.show = false
    }

    showMessage(msg) {
        if (this.show) {
            return
        }
        this.show = true
        Message({
            message: msg || 'Error',
            type: 'error',
            duration: 5 * 1000,
            onClose: () => {
                this.show = false
            }
        })
    }
}
const selfMessage = createSingle(MessageModal)
export const singleMessage = selfMessage()
