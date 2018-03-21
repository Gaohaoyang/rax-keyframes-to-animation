/*
 * @Author: ChuanShi.ghy
 * @Date: 2018-03-19 13:08:18
 * @Last Modified by: ChuanShi.ghy
 * @Last Modified time: 2018-03-21 15:44:13
 */
import { isWeex } from 'universal-env';

const store = []; // 存储是否已经添加过了 css 的 keyframes name

/**
 * 获取 animation 参数
 * @param {String} animationStr
 */
const getAnimationParams = (animationStr) => {
  let totalDuration = 999; // ms
  let timingFunction = 'linear';
  let iterationCount = 1;
  let delay = 0;
  let transformOrigin = '50% 50%';
  const animationFillMode = 'forwards';

  const animation = animationStr.trim().match(/animation: .+;/)[0].split(':')[1].trim().slice(0, -1);
  const animationTemp = animation.split(' ');
  [, timingFunction] = animationTemp;
  totalDuration = parseFloat(animationTemp[2].match(/\d+\.?\d*/)[0], 10) * 1000;

  const transformOriginTemp = animationStr.trim().match(/transform-origin: .+;/)[0].split(':')[1].trim();
  transformOrigin = transformOriginTemp.slice(0, -1);

  const iterationCountTemp = animationStr.trim().match(/animation-iteration-count: .+;/)[0].split(':')[1].trim().split(' ');

  iterationCount = iterationCountTemp[0].slice(0, -1);

  const delayMatch = animationStr.trim().match(/animation-delay: .+;/);
  if (delayMatch) {
    delay = parseFloat(delayMatch[0].split(':')[1].trim().match(/\d+\.?\d*/)[0], 10) * 1000;
  }

  return {
    animation,
    totalDuration,
    timingFunction,
    transformOrigin,
    iterationCount,
    delay,
    animationFillMode,
  };
};

/**
 * 获取 keyframes 代码解析结果
 * @param {String} keyframesStr keyframes css 代码字符串
 * @param {String} animationParam animationParam css 代码字符串
 */
const getKeyframesParams = (keyframesStr, animationParam) => {
  const temp = keyframesStr.trim().match(/(\d+)%.+\n(.*;\n)+/g);

  const arr = temp.map((item) => {
    let percentage = '';
    let transform;
    let opacity;
    let backgroundColor;
    let width;
    let height;
    const itemArr = item.slice(0, -1).split('\n');
    percentage = parseInt(itemArr[0].match(/(\d+)%/)[1], 10);
    const itemArrWithoutNum = itemArr.slice(1, itemArr.length);

    itemArrWithoutNum.forEach((p) => {
      const pTrim = p.trim();
      if (pTrim.indexOf('transform') === 0) {
        transform = pTrim.split(':')[1].slice(0, -1).trim();
      }
      if (pTrim.indexOf('opacity') === 0) {
        opacity = pTrim.split(':')[1].slice(0, -1).trim();
      }
      if (pTrim.indexOf('background-color') === 0) {
        backgroundColor = pTrim.split(':')[1].slice(0, -1).trim();
      }
      if (pTrim.indexOf('width') === 0) {
        width = pTrim.split(':')[1].slice(0, -1).trim();
      }
      if (pTrim.indexOf('height') === 0) {
        height = pTrim.split(':')[1].slice(0, -1).trim();
      }
    });

    return {
      timePoint: animationParam.totalDuration * percentage * 0.01,
      percentage,
      styles: {
        transform,
        opacity,
        backgroundColor,
        width,
        height,
      },
    };
  });

  // 计算 duration
  const resArr = arr.map((item, index) => {
    let duration = 0;
    if (index > 0) {
      duration = arr[index].timePoint - arr[index - 1].timePoint;
    }

    return {
      ...item,
      duration,
    };
  });

  return resArr;
};

/**
 * 将 keyframes 转化为 weex animation
 * @param {Element} node 施加动画的节点
 * @param {String} animationStr animation css 代码
 * @param {String} keyframes keyframes 代码
 * @param {Function} cb 回调函数
 */
const keyframesToAnimation = (node, animationStr, keyframes, cb) => {
  const nodeElement = node;
  const animationParam = getAnimationParams(animationStr);
  const keyframesParams = getKeyframesParams(keyframes, animationParam);

  if (isWeex) {
    let totalIterationCount = 1;
    let i = 0;
    const animation = __weex_require__('@weex-module/animation');
    const runOnce = () => {
      let { delay } = animationParam;
      if (i > 1 || totalIterationCount > 1) {
        delay = 0;
      }

      animation.transition(nodeElement, {
        styles: {
          ...keyframesParams[i].styles,
          transformOrigin: animationParam.transformOrigin,
        },
        duration: keyframesParams[i].duration, // ms
        timingFunction: animation.timingFunction,
        needLayout: false,
        delay, // ms
      }, () => {
        i += 1;
        if (i < keyframesParams.length) {
          runOnce();
        } else if (animationParam.iterationCount === 'infinite') {
          // 无限次数循环
          i = 0;
          runOnce();
        } else if (animationParam.iterationCount !== 'infinite' && totalIterationCount < parseInt(animationParam.iterationCount, 10)) {
          // 有限次数循环
          i = 0;
          totalIterationCount += 1;
          runOnce();
        } else if (cb) {
          cb();
        }
      });
    };
    runOnce();
  } else {
    // web 下直接使用 css3 的 keyframes
    const keyframesName = keyframes.trim().match(/\s*@keyframes\s(\w+)\s*\{\n/)[1];
    const styleSheet = document.styleSheets[0];

    if (store.indexOf(keyframesName) === -1) {
      store.push(keyframesName);
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
    nodeElement.style.animation = animationParam.animation;
    nodeElement.style.transformOrigin = animationParam.transformOrigin;
    nodeElement.style.animationIterationCount = animationParam.iterationCount;
    nodeElement.style.animationFillMode = animationParam.animationFillMode;
    nodeElement.style.animationDelay = `${animationParam.delay}ms`;

    nodeElement.addEventListener('animationend', () => {
      if (cb) {
        cb();
      }
    });
  }
};

export default keyframesToAnimation;
