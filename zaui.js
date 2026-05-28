/**
 * zaui.js
 * @description A library for providing a simple adaptive UI in ZeppOS 一个用于在ZeppOS中提供简单自适应UI的库
 * @version 0.5.0
 * @date 2026/02/01
 * @author ZHAO Charlie_Q
 * @license MIT
 *
 * @class ZeppOS Adaptive UI
 * Provides adaptive UI methods based on three different approaches. 提供了基于三种不同思路的自适应UI方式
 * P0 - Rewrite the official px function to real-time calculation. 将官方px函数重写为实时计算
 * P1 - Based on height adaptation, suitable for the vast majority of situations. 基于高度适应，适用于绝大多数情况
 * P2 - Compatibility baseline based on circular screen. 基于圆形屏幕的兼容性底线
 * P3 - Devoted to point-to-point and maximum overlap design. 致力于点对点和最大重叠设计
 * PWW - Adaptive UI function suitable for secondary screen widgets. 适用于副屏小组件的自适应UI函数
 * @example 
 * import { pww,ph,pl } from "../utils/zaui"
 * createWidget(widget.TEXT, {
 *    x: pww(0),
 *    y: ph(18),
 *    w: pl(480),
 *    h: pl(27),
 *    color: 0xFFFFFF,
 *    text_size: pl(20),
 *    align_h: align.CENTER_H,
 *    align_v: align.CENTER_V,
 *    text_style: text_style.NONE,
 *    text: 'Hello World!'
 *  })
 * 
 *  */
import { getDeviceInfo, SCREEN_SHAPE_SQUARE, SCREEN_SHAPE_ROUND } from '@zos/device'
let { width, height, screenShape } = getDeviceInfo()


//P0 - Rewrite the official px function to real-time calculation. 将官方px函数重写为实时计算
const pxw = width / 480

export function px0(x) {
    zx = x * pxw;
    return (zx);
}



//P1 - Based on height adaptation, suitable for the vast majority of situations. 基于高度适应，适用于绝大多数情况
const pxh = height / 480
const widbase1 = width / 2 - height / 2

export function pw(w) {
    zw = w * pxh + widbase1;
    return (zw);
}
export function ph(h) {  //在P1上已废弃，为兼容保留
    zh = h * pxh;
    return (zh);
}
export function pl(l) {
    l1 = l * pxh;
    return (l1);
}



//P2 - Compatibility baseline based on circular screen. 基于圆形屏幕的兼容性底线
const heibase2 = height / 2 - 240 * pxw

export function pw2(w1) {
    zw1 = w1 * pxw;
    return (zw1);
}
export function ph2(h) {
    zh = heibase2 + h * pxw;
    return (zh);
}
export function pl2(l) {
    l1 = l * pxw;
    return (l1);
}



//P3 - Devoted to point-to-point and maximum overlap design. 致力于点对点和最大重叠设计
let pxw1
if (screenShape == SCREEN_SHAPE_ROUND) {
    pxw1 = width / 480
} else {
    pxw1 = width / 390
}
const widbase3 = width / 2 - 240 * pxw1
const heibase3 = height / 2 - 240 * pxw1

export function pw3(w) {
    zw = widbase3 + w * pxw1;
    return (zw);
}
export function ph3(h) {
    zh = heibase3 + h * pxw1;
    return (zh);
}
export function pl3(l) {
    l1 = l * pxw1;
    return (l1);
}



import { getAppWidgetSize } from '@zos/ui'

const { w,margin } = getAppWidgetSize()
//PWW - Adaptive UI function suitable for secondary screen widgets. 适用于副屏小组件的自适应UI函数
const pww0 = w / 400

export function pww(x) {//卡片内相对x坐标用
    zx = margin + x * pww0;
    return (zx);
}
export function pww2(x) {//480尺寸屏幕上绝对x坐标用
    zx = margin + (x - 40) * pww0;
    return (zx);
}
export function phw(x) {//phw和plw通用  phw为兼容性保留  均根据宽度缩放
    zx = x * pww0;
    return (zx);
}
export function plw(x) {
    zx = x * pww0;
    return (zx);
}