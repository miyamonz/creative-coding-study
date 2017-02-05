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


  let func = time =>  i => {
    let f = (t, e=0) => {
      t -= e;
      let m = t - Math.floor(t);
      return  Math.floor(t)+ease.quintInOut(m) + e;
    }
    let [r,theta] = [i*2, i]
      .map( (e,index)=> e*[1,0.1*f(time/50, i/100)][index] )
    let pos = [r*Math.cos(theta), r*Math.sin(theta) ]
      .map(e => e+width/2)
    p.fill(color(time/10 + i/10))
    p.ellipse(...pos,i*0.5)
  };

  p.draw = () => {
    p.background(255);
    let time = p.millis()
    
    let polar = (r,t) => [r*Math.cos(t), r*Math.sin(t)]
    let f = t => Math.sin(Math.sin(t))
    
    for(let x=0; x<width; x += 7){
      for(let y=0; y<width; y+= 7){
        let r = Math.cos(x ** 2  * y)
        r += Math.random()
        r += Math.sin(time)
        p.ellipse(x,y,r)
      }
    }

    
    
  }
}

export default sketch;
