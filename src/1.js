import {range, i2xy, cycle, add, lerp} from "./util/funcs.js"
import * as ease from "./util/ease.js"
let sketch = p => {
  let width = 400;
  p.setup = () => {
    p.createCanvas(width, width);
    p.background(255);
    p.strokeWeight(0)
    p.fill(0)
  }

  let color = c => {
    let freq = [1,2,3] 
    let color = freq
      .map( f => 0.5 + Math.sin(f * c) )
      .map(e => e*100)
    return p.color(...color)
  }

  p.draw = () => {
    p.background(255);
    let time = p.frameCount
    let num = range(100)
    num.forEach( i => {
      let f = (t, e=0) => {
        t -= e;
        let m = t - Math.floor(t);
        return  Math.floor(t)+ease.quintInOut(m) + e;
      }
      let [r,theta] = [i*2, i]
        .map( (e,index)=> e*[1,0.1*f(time/100, i/100)][index] )
      let pos = [r*Math.cos(theta), r*Math.sin(theta) ]
        .map(e => e+width/2)
      p.fill(color(time/10 + i/10))
      p.ellipse(...pos,i*0.5)
    } )
  }
}

export default sketch;
