/*
 * @Author: ChuanShi.ghy
 * @Date: 2018-03-19 13:08:18
 * @Last Modified by: ChuanShi.ghy
 * @Last Modified time: 2018-03-19 16:44:16
 */
import transition from 'universal-transition';

const keyframesToTransition = (box, animation, keyframes) => {
  const animationParam = getAnimationParams(animation)
  const keyframesParams = getKeyframesParams(keyframes, animationParam)
  let i = 1;

  // console.log('------------------------------------');
  // console.log(animationParam);
  // console.log('------------------------------------');
  // console.log(keyframesParams)

  const runOnce = () => {
    transition(box, {
      transform: keyframesParams[i].transform,
      opacity: keyframesParams[i].opacity,
    }, {
      timingFunction: animation.timingFunction,
      delay: 0,
      duration: keyframesParams[i].duration,
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
}

const getAnimationParams = (animationStr) => {
  let totalDuration, timingFunction, iterationCount, delay;

  const animationTemp = animationStr.trim().match(/animation: .+;/)[0].split(':')[1].trim().split(' ')
  timingFunction = animationTemp[1]
  totalDuration = parseFloat(animationTemp[2].match(/\d+\.?\d*/)[0], 10) * 1000;

  // TODO
  // iterationCount,
  // delay,

  return {
    totalDuration,
    timingFunction,
    iterationCount,
    delay,
  }
}

const getKeyframesParams = (keyframesStr, animationParam) => {
  const temp = keyframesStr.trim().match(/(\d+)%.+\n(.*;\n)+/g);

  const arr = temp.map((item) => {
    let percentage, transform, opacity;
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
    });

    return {
      timePoint: animationParam.totalDuration * percentage * 0.01,
      percentage,
      transform,
      opacity,
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