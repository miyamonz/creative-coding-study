import {range, i2xy, cycle, add, lerp} from "./util/funcs.js"
import * as ease from "./util/ease.js"
import Timeline from "./util/timeline.js"

let width = 400;
let center = [width/2, width/2];
let timeline = new Timeline();
let e = ease.quintInOut;
let t = 0.3
timeline.then([-100,-100], 0)
  .moveTo([-100,  100],t,e)
  .moveTo([ 100,  100],t)
  .moveTo([ 100, -100],t,e)
  .moveTo([-100, -100],t)
  .repeat()

let sketch = p => {
  p.setup = () => {
    let c = p.createCanvas(width, width);
    p.background(0);
    p.strokeWeight(0)
    p.fill(0)
    p.textSize(25)
  }

  let rasen = (r = 1,f = 1) => t => [Math.cos, Math.sin].map(fu => r * t * fu(t * f))
  p.draw = () => {
    p.background(0);
    p.fill(255);
    let time = p.millis() / 1000
    let seq = i => i + time/2
    let text = "ものっち";
    // text = text.repeat(7);
    text.split("").forEach( (str, i) => {
      let pos = timeline.func(time/2 + i/10)
      p.text(str,  ...pos.map( e => e + center[1] ) )
    } )
  }
}

export default sketch;
