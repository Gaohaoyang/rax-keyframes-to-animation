const keyframesExamples = [{
  name: 'tada',
  animation: `
      .element-animation{
        animation: animationFrames linear 1s;
        animation-iteration-count: 1;
        transform-origin: 50% 50%;
      }
    `,
  keyframes: `
      @keyframes animationFrames{
        0% {
          transform:  rotate(0deg) scale(1.00);
        }
        10% {
          transform:  rotate(-3deg) scale(0.80);
        }
        20% {
          transform:  rotate(-3deg) scale(0.80);
        }
        30% {
          transform:  rotate(3deg) scale(1.20);
        }
        40% {
          transform:  rotate(-3deg) scale(1.20);
        }
        50% {
          transform:  rotate(3deg) scale(1.20);
        }
        60% {
          transform:  rotate(-3deg) scale(1.20);
        }
        70% {
          transform:  rotate(3deg) scale(1.20);
        }
        80% {
          transform:  rotate(-3deg) scale(1.20);
        }
        90% {
          transform:  rotate(3deg) scale(1.20);
        }
        100% {
          transform:  rotate(0deg) scale(1.20);
        }
      }
    `,
}, {
  name: 'woble',
  animation: `
    .element-animation{
      animation: animationFrames linear 1s;
      animation-iteration-count: 1;
      transform-origin: 50% 50%;
    }`,
  keyframes: `
    @keyframes animationFrames{
      0% {
        transform:  translate(0px,0px)  rotate(0deg) ;
      }
      15% {
        transform:  translate(-25px,0px)  rotate(-5deg) ;
      }
      30% {
        transform:  translate(20px,0px)  rotate(3deg) ;
      }
      45% {
        transform:  translate(-15px,0px)  rotate(-3deg) ;
      }
      60% {
        transform:  translate(10px,0px)  rotate(2deg) ;
      }
      75% {
        transform:  translate(-5px,0px)  rotate(-1deg) ;
      }
      100% {
        transform:  translate(0px,0px)  rotate(0deg) ;
      }
    }
  `,
}, {
  name: 'shake',
  animation: `
    .element-animation{
      animation: animationFrames linear 1s;
      animation-iteration-count: 1;
      transform-origin: 50% 50%;
    }
  `,
  keyframes: `
    @keyframes animationFrames{
      0% {
        transform:  translate(0px,0px)  ;
      }
      10% {
        transform:  translate(-10px,0px)  ;
      }
      20% {
        transform:  translate(10px,0px)  ;
      }
      30% {
        transform:  translate(-10px,0px)  ;
      }
      40% {
        transform:  translate(10px,0px)  ;
      }
      50% {
        transform:  translate(-10px,0px)  ;
      }
      60% {
        transform:  translate(10px,0px)  ;
      }
      70% {
        transform:  translate(-10px,0px)  ;
      }
      80% {
        transform:  translate(10px,0px)  ;
      }
      90% {
        transform:  translate(-10px,0px)  ;
      }
      100% {
        transform:  translate(0px,0px)  ;
      }
    }
  `,
}, {
  name: 'bounce',
  animation: `
    .element-animation{
      animation: animationFrames linear 0.8s;
      animation-iteration-count: 1;
      transform-origin: 50% 50%;
    }
  `,
  keyframes: `
    @keyframes animationFrames{
      0% {
        transform:  translate(0px,0px)  ;
      }
      15% {
        transform:  translate(0px,-25px)  ;
      }
      30% {
        transform:  translate(0px,0px)  ;
      }
      45% {
        transform:  translate(0px,-15px)  ;
      }
      60% {
        transform:  translate(0px,0px)  ;
      }
      75% {
        transform:  translate(0px,-5px)  ;
      }
      100% {
        transform:  translate(0px,-5px)  ;
      }
    }
  `,
}, {
  name: 'rotate out',
  animation: `
    .element-animation{
      animation: animationFrames linear 0.7s;
      animation-iteration-count: 1;
      transform-origin: 50% 50%;
    }
  `,
  keyframes: `
  @keyframes animationFrames{
    0% {
      opacity:1;
      transform:  rotate(0deg) ;
    }
    100% {
      opacity:0;
      transform:  rotate(200deg) ;
    }
  }
  `,
}]

export default keyframesExamples;