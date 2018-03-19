/*
 * @Author: ChuanShi.ghy
 * @Date: 2018-03-19 13:08:12
 * @Last Modified by: ChuanShi.ghy
 * @Last Modified time: 2018-03-19 16:59:17
 */
import { createElement, Component, render, findDOMNode } from 'rax';
import View from 'rax-view';
import transition from 'universal-transition';
import keyframesToTransition from './keyframesToTransition.js';

import './App.css';

const animation = `
  {
    animation: animationFrames ease 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
  }
`
const keyframes = `
  @keyframes animationFrames{
    0% {
      transform:  translate(0px,0px)  rotate(0deg) ;
    }
    15% {
      transform:  translate(-25px,0px)  rotate(-5deg) ;
      opacity: 0.9;
    }
    30% {
      transform:  translate(20px,0px)  rotate(3deg) ;
      opacity: 0.8;
    }
    45% {
      transform:  translate(-15px,0px)  rotate(-3deg) ;
      opacity: 0.7;
    }
    60% {
      transform:  translate(10px,0px)  rotate(2deg) ;
      opacity: 0.6;
    }
    75% {
      transform:  translate(-5px,0px)  rotate(-1deg) ;
      opacity: 0.4;
    }
    100% {
      transform:  translate(0px,0px)  rotate(0deg) ;
      opacity: 0.1;
    }
  }
`

class App extends Component {
  componentDidMount = () => {



    const box = findDOMNode(this.box); // 获取元素

    // 调用动画方法
    setTimeout(() => {
      keyframesToTransition(box, animation, keyframes);
    }, 40);
  }

  render() {
    return (
      <View
        ref={(ref) => {
          this.box = ref;
        }}
        className="container"
      />
    );
  }
}

export default App;