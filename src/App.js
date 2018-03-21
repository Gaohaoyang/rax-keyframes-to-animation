/*
 * @Author: ChuanShi.ghy
 * @Date: 2018-03-19 13:08:12
 * @Last Modified by: ChuanShi.ghy
 * @Last Modified time: 2018-03-21 16:12:05
 */
import { createElement, Component, render, findDOMNode } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Picker from 'rax-picker';
import keyframesToAnimation from './keyframesToAnimation.js';
import keyframesExamples from './keyframesExamples';

import './App.css';

// const styles = {
//   box: {
//     width: 100,
//     height: 100,
//     marginLeft: 160,
//     marginTop: 300,
//     backgroundColor: '#5c8fdb',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// };

class App extends Component {

  state = {
    selectedValue: 0,
    // animationStyle: {},
  }

  componentDidMount = () => {
    this.runAnimation();
  }

  runAnimation = (index = 0) => {
    const box = findDOMNode(this.box); // 获取元素
    // 调用动画方法
    setTimeout(() => {
      keyframesToAnimation(box, keyframesExamples[index].animation, keyframesExamples[index].keyframes, () => {
        console.log('animation end');
      });
    }, 0);
  }

  onValueChange = (index) => {
    this.setState({
      selectedValue: index,
    }, () => {
      this.runAnimation(index);
    });
  }

  render() {

    const {
      selectedValue,
      // animationStyle,
    } = this.state;

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
        <View className="pickerArea">
          <Text className="title">点击选择示例动画</Text>
          <Picker
            style={{
              // width: 200,
              // height: 220,
              fontSize: 36,
              border: '1px solid #ddd',
              borderRadius: '4',
              color: '#5c8fdb',
              // lineHeight: 1,
            }}
            selectedValue={selectedValue}
            onValueChange={this.onValueChange}
          >
            {
              keyframesExamples.map((item, index) => (
                <Picker.Item key={index} value={index} label={item.name} />
              ))
            }
          </Picker>
        </View>

      </View>

    );
  }
}

export default App;