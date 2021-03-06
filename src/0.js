import {range, i2xy, cycle, add, lerp} from "./util/funcs.js"
let sketch = p => {
  let width = 400;
  p.setup = () => {
    p.createCanvas(width, width);
    p.background(255);
    p.strokeWeight(0)
    let [a,b] = [1,2]
    let c = 2 *  [1,9]
    console.log(a,b,c)
  }

  let color = c => {
    let freq = [3,2,7] 
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
      let {x,y} = i2xy(i,10);
      let diff = cycle(time/5+i/Math.PI)
      let t = Math.sin(time/50 + i*i-1)
      let pos = [x,y]
        .map(e => lerp(0,9,10,width-10,e))
        .map(e => t*e+(1-t)*width/2)
        .map(add(diff))

      p.fill(color(i/100 + time/60));
      let w = 1 + Math.sin(time/20 + i)
      
      p.ellipse(...pos,10 + 10*w)
    } )
  }
}

export default sketch;
