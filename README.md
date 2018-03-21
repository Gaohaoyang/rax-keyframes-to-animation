# Keyframes to Animation in Rax

<p align="center">
  <img src="https://gw.alicdn.com/tfs/TB1Kbc3e1uSBuNjy1XcXXcYjFXa-536-536.png" width="320px" />
</p>

在 rax 中使用 CSS3 中的 @keyframes 语法来写 rax/weex 动画。

- 使用 keyframes 语法提供更友好的编程体验
- weex 端使用 `@weex-module/animation` 执行动画
- web 端直接使用 webView 层执行 CSS3 keyframes 动画

## Demo

- web 版
  - https://gaohaoyang.github.io/rax-keyframes-to-animation/demo/
  - ![](https://gw.alicdn.com/tfs/TB1nfHpe1SSBuNjy0FlXXbBpVXa-200-200.png)


- weex 版（请使用具有 weex 环境的 app 扫码预览，如手淘）:
  - https://gaohaoyang.github.io/rax-keyframes-to-animation/demo/bundle.min.js?_wx_tpl=https://gaohaoyang.github.io/rax-keyframes-to-animation/demo/bundle.min.js
  - ![](https://gw.alicdn.com/tfs/TB1jRTse7yWBuNjy0FpXXassXXa-200-200.png)

## Usage

安装组件

``` bash
yarn add rax-keyframes-to-animation
```

或

``` bash
npm i rax-keyframes-to-animation -S
```

使用示例

``` jsx
// App.js
import { createElement, Component, render, findDOMNode } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import KeyframesToAnimation from 'rax-keyframes-to-animation';

import './App.css';

const animationStr = `
  .element-animation{
    animation: tada linear 1s;
    animation-iteration-count: 2;
    transform-origin: 50% 50%;
  }
`;
const keyframesStr = `
  @keyframes tada{
    0% {
      transform: rotate(0deg) scale(1.00);
    }
    10% {
      transform: rotate(-3deg) scale(0.80);
    }
    20% {
      transform: rotate(-3deg) scale(0.80);
    }
    30% {
      transform: rotate(3deg) scale(1.20);
    }
    40% {
      transform: rotate(-3deg) scale(1.20);
    }
    50% {
      transform: rotate(3deg) scale(1.20);
    }
    60% {
      transform: rotate(-3deg) scale(1.20);
    }
    70% {
      transform: rotate(3deg) scale(1.20);
    }
    80% {
      transform: rotate(-3deg) scale(1.20);
    }
    90% {
      transform: rotate(3deg) scale(1.20);
    }
    100% {
      transform: rotate(0deg) scale(1.20);
    }
  }
`;

class App extends Component {

  componentDidMount = () => {
    this.runAnimation();
  }

  runAnimation = () => {
    const box = findDOMNode(this.box); // 获取元素
    // 调用动画方法
    setTimeout(() => {
      KeyframesToAnimation(box, animationStr, keyframesStr, () => {
        console.log('animation end');
      });
    }, 0);
  }

  render() {
    return (
      <View className="container">
        <View
          ref={(ref) => {
            this.box = ref;
          }}
          className="box"
        >
          <Text className="boxText">hello</Text>
        </View>
      </View>
    );
  }
}

export default App;
```

``` css
/* App.css */
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-start;
  align-items: flex-start;
}
.box {
  width: 100;
  height: 100;
  margin-left: 160;
  margin-top: 300;
  background-color: #5c8fdb;
  border-radius: 10;
  justify-content: center;
  align-items: center;
}
.boxText {
  color: #fff;
  font-size: 30;
}
```

## Api

### KeyframesToAnimation(node, animationStr, keyframesStr, callback)

功能：用于执行动画

参数：

- node
  dom 节点


- animationStr
  animation CSS 代码字符串，注意 animation name 要与 keyframes 中的 name 对应


- keyframesStr
  keyframes CSS 代码字符串，注意 keyframes name 要与 animation 中的 name 对应


- callback
  回调函数，注意当 `animation-iteration-count` 值为 infinite 时，回调函数永远不会执行

## 原理

首先将输入的 animationStr 和 keyframesStr 进行解析。

weex 中使用 `@weex-module/animation` 进行动画调用，使用递归的方式执行每一个关键帧的样式。

web 中直接将 keyframesStr 直接插入到样式表中，在 dom 元素上修改 animation 属性进行动画。

## Contribute

开源项目，欢迎使用，欢迎找 bug，欢迎贡献代码~

https://github.com/Gaohaoyang/rax-keyframes-to-animation

`yarn`

Install all dependencies.

`yarn run start`

Runs the app in development mode.

Open [http://localhost:9999](http://localhost:9999) to view it in the browser.

The page will reload if you make edits.

`yarn run lint`

You will see the lint errors in the console.

`yarn run build-demo`

build demo.
