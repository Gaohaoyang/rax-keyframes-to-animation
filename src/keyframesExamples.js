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
        opacity: 1;
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
  name: 'swing',
  animation: `
    .element-animation{
      animation: animationFrames linear 1s;
      animation-iteration-count: 1;
      transform-origin: 50% 0%;
    }
  `,
  keyframes: `
    @keyframes animationFrames{
      0% {
        transform:  rotate(0deg) ;
      }
      20% {
        transform:  rotate(15deg) ;
      }
      40% {
        transform:  rotate(-10deg) ;
      }
      60% {
        transform:  rotate(5deg) ;
      }
      80% {
        transform:  rotate(-5deg) ;
      }
      100% {
        transform:  rotate(0deg) ;
      }
    }
  `,
}, {
  name: 'shake with color',
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
        background-color: #ff5000;
      }
      20% {
        transform:  translate(10px,0px)  ;
      }
      30% {
        transform:  translate(-10px,0px)  ;
      }
      40% {
        transform:  translate(10px,0px)  ;
        background-color: #FF0036;
      }
      50% {
        transform:  translate(-10px,0px)  ;
      }
      60% {
        transform:  translate(10px,0px)  ;
      }
      70% {
        transform:  translate(-10px,0px)  ;
        background-color: #ff5000;
      }
      80% {
        transform:  translate(10px,0px)  ;
      }
      90% {
        transform:  translate(-10px,0px)  ;
      }
      100% {
        transform:  translate(0px,0px)  ;
        background-color: #FF0036;
      }
    }
  `,
},{
  name: 'hinge',
  animation: `
    .element-animation{
      animation: animationFrames ease 1s;
      animation-iteration-count: 1;
      transform-origin: 0% 0%;
      animation-fill-mode:forwards; /*when the spec is finished*/
    }
  `,
  keyframes: `
    @keyframes animationFrames{
      0% {
        transform:  rotate(0deg) ;
      }
      20% {
        transform:  rotate(60deg) ;
      }
      40% {
        transform:  rotate(40deg) ;
      }
      60% {
        transform:  rotate(54deg) ;
      }
      80% {
        transform:  rotate(42deg) ;
      }
      100% {
        transform:  rotate(46deg) ;
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
}, {
  name: 'rotate in down',
  animation: `
    .element-animation{
      animation: animationFrames linear 0.7s;
      animation-iteration-count: 1;
      transform-origin: 0% 100%;
    }
  `,
  keyframes: `
    @keyframes animationFrames{
      0% {
        opacity:0;
        transform:  rotate(-90deg) ;
      }
      100% {
        opacity:1;
        transform:  rotate(0deg) ;
      }
    }
  `,
}]

export default keyframesExamples;