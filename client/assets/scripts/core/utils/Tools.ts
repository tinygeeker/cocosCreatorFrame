import { _decorator, Animation, Node, SpriteFrame } from 'cc';


// 递归获取子节点
export const findChildByNameRecursive = (parent: Node, name: string): Node => {
    if (parent.name === name) {
        return parent;
    }
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i];
        const result = findChildByNameRecursive(child, name);
        if (result) {
            return result;
        }
    }
    return null;
}

// 根据传入的数组下标，反方向旋转取值
export const reorderArray = (arr, startValue) => {
    const result = [];
    let currentIndex = startValue;
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[currentIndex]);
        currentIndex = (currentIndex - 1 + arr.length) % arr.length;
    }
    return result;
}

// 动画修改为第一帧
export const resetAnimationToFirstFrame = (animationComponent: Animation) => {
    // animationComponent.stop();
    // 获取默认动画的名称
    const defaultClipName = animationComponent.defaultClip?.name;
    console.log("defaultClipName", defaultClipName);
    // 获取默认动画状态
    const clipState = animationComponent.getState(defaultClipName);
    console.log("clipState", clipState);
    if (clipState) {
        // 将动画的当前时间设置为 0，即回到第一帧
        clipState.time = 0;
        // 重新激活动画状态
        clipState.sample();
    }
}


/**
 * 将秒数转换为分钟:秒的格式
 * @param {number} seconds - 总秒数
 * @param {object} options - 配置选项
 * @param {boolean} options.showZeroMinute - 是否显示零分钟 (默认: true)
 * @param {boolean} options.showZeroSecond - 是否显示零秒 (默认: true)
 * @returns {string} 格式化后的时间字符串 (如: "01:30", "5:4", "0:0")
 */
export function secondsToMinuteSecond(seconds, options = {}) {
    // 处理负数或非数值输入
    if (isNaN(seconds) || seconds < 0) {
        return "0:0";
    }

    const { showZeroMinute = true, showZeroSecond = true }: any = options;

    // 计算分钟和秒
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // 格式化分钟和秒
    let formattedMinutes, formattedSeconds;

    // 分钟格式化
    if (minutes > 0 || showZeroMinute) {
        formattedMinutes = minutes.toString();
    } else {
        formattedMinutes = "";
    }

    // 秒格式化
    if (remainingSeconds > 0 || showZeroSecond) {
        // 小于10的秒补零
        formattedSeconds = remainingSeconds < 10 ?
            `0${remainingSeconds}` :
            remainingSeconds.toString();
    } else {
        formattedSeconds = "";
    }

    // 组合结果
    if (formattedMinutes && formattedSeconds) {
        return `${formattedMinutes}:${formattedSeconds}`;
    } else if (formattedMinutes) {
        return formattedMinutes;
    } else if (formattedSeconds) {
        return formattedSeconds;
    } else {
        return "0:0";
    }
}

// 时间格式转换
export function timestampToDateTime(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 将对象转换为查询字符串（替代 URLSearchParams.toString()）
 * @param {Object} params - 要转换的参数对象，如 {a:1, b:2}
 * @returns {string} 转换后的查询字符串，如 "a=1&b=2"
 */
export function stringifyParams(params) {
    if (!params || typeof params !== 'object') {
        return '';
    }

    const parts = [];
    for (const key in params) {
        // 跳过原型链上的属性
        if (!Object.prototype.hasOwnProperty.call(params, key)) {
            continue;
        }

        const value = params[key];
        // 处理值为null或undefined的情况
        if (value === null || value === undefined) {
            continue;
        }

        // 对键和值进行编码，处理特殊字符和中文
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
        parts.push(`${encodedKey}=${encodedValue}`);
    }

    // 用&连接所有参数对
    return parts.join('&');
}

const INDEX_REG = /\((\d+)\)/;

const getNumberWithinString = (str: string) => parseInt(str.match(INDEX_REG)?.[1] || "0");

export const sortSpriteFrame = (spriteFrame: Array<SpriteFrame>) =>
    spriteFrame.sort((a, b) => getNumberWithinString(a.name) - getNumberWithinString(b.name));
