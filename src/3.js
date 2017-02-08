import {range, i2xy, cycle, add, lerp} from "./util/funcs.js"
import * as ease from "./util/ease.js"
let sketch = p => {
  let width = 400;
  p.setup = () => {
    let c = p.createCanvas(width, width);
    p.background(0);
    p.strokeWeight(0)
    p.fill(0)
    p.textSize(25)
  }

  let center = [width/2, width/2];
  let rasen = (r = 1,f = 1) => t => [Math.cos, Math.sin].map(fu => r * t * fu(t * f))
  p.draw = () => {
    p.background(0);
    p.fill(255);
    let time = p.millis() / 100 % 100
    let seq = i => i + time/4
    let text = "ものっちさん" 
    text.split("").forEach( (str, i) => {
      let pos = rasen(6)(seq(i)).map( e => e + center[0]);
      p.text(str,  ...pos )
      // p.ellipse(...pos, 10);
    } )
  }
}

export default sketch;
