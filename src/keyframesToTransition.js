/*
 * @Author: ChuanShi.ghy
 * @Date: 2018-03-19 13:08:18
 * @Last Modified by: ChuanShi.ghy
 * @Last Modified time: 2018-03-20 00:36:01
 */
import { isWeex } from 'universal-env';

const keyframesToTransition = (box, animation, keyframes) => {
  const animationParam = getAnimationParams(animation)
  const keyframesParams = getKeyframesParams(keyframes, animationParam)

  if (isWeex) {
    let i = 0;
    const animation = __weex_require__('@weex-module/animation');
    const runOnce = () => {
      animation.transition(box, {
        styles: {
          ...keyframesParams[i].styles,
          transformOrigin: animationParam.transformOrigin,
        },
        duration: keyframesParams[i].duration, //ms
        timingFunction: animation.timingFunction,
        needLayout: false,
        delay: 0 //ms
      }, () => {
        i += 1;
        if (i < keyframesParams.length) {
          runOnce();
        } else {
          console.log('animation end');
        }
      });
    }
    runOnce();
  } else {
    // web 下直接使用 css 3 的 keyframes
  }
}

const getAnimationParams = (animationStr) => {
  let totalDuration, timingFunction, iterationCount, delay, transformOrigin;

  const animationTemp = animationStr.trim().match(/animation: .+;/)[0].split(':')[1].trim().split(' ')
  timingFunction = animationTemp[1]
  totalDuration = parseFloat(animationTemp[2].match(/\d+\.?\d*/)[0], 10) * 1000;

  const transformOriginTemp = animationStr.trim().match(/transform-origin: .+;/)[0].split(':')[1].trim();
  transformOrigin = transformOriginTemp.slice(0, transformOriginTemp.length - 1);

  const iterationCountTemp = animationStr.trim().match(/animation-iteration-count: .+;/)[0].split(':')[1].trim().split(' ')

  iterationCount = parseInt(iterationCountTemp[0].slice(0, iterationCountTemp.length), 10);

  // TODO
  // iterationCount,
  // delay,

  return {
    totalDuration,
    timingFunction,
    transformOrigin,
    iterationCount,
    delay,
  }
}

const getKeyframesParams = (keyframesStr, animationParam) => {
  const temp = keyframesStr.trim().match(/(\d+)%.+\n(.*;\n)+/g);

  const arr = temp.map((item) => {
    let percentage, transform, opacity, backgroundColor, width, height;
    item = item.slice(0, item.length - 1);
    const itemArr = item.split('\n');
    percentage = parseInt(itemArr[0].match(/(\d+)%/)[1], 10);
    const itemArrWithoutNum = itemArr.slice(1, itemArr.length);

    itemArrWithoutNum.forEach(p => {
      const pTrim = p.trim();
      if (pTrim.indexOf('transform') === 0) {
        transform = pTrim.split(':')[1];
        transform = transform.slice(0, transform.length - 1).trim();
      }
      if (pTrim.indexOf('opacity') === 0) {
        opacity = pTrim.split(':')[1];
        opacity = opacity.slice(0, opacity.length - 1).trim();
      }
      if (pTrim.indexOf('background-color') === 0) {
        backgroundColor = pTrim.split(':')[1];
        backgroundColor = backgroundColor.slice(0, backgroundColor.length - 1).trim();
      }
      if (pTrim.indexOf('width') === 0) {
        width = pTrim.split(':')[1];
        width = width.slice(0, width.length - 1).trim();
      }
      if (pTrim.indexOf('height') === 0) {
        height = pTrim.split(':')[1];
        height = height.slice(0, height.length - 1).trim();
      }
    });

    return {
      timePoint: animationParam.totalDuration * percentage * 0.01,
      percentage,
      styles:{
        transform,
        opacity,
        backgroundColor,
        width,
        height,
      }
    }
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
    }
  });

  return resArr;
}


// TODO
// 如果是 H5 直接插入 css 样式表

export default keyframesToTransition;