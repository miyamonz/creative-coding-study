import {range, i2xy, cycle, add, lerp} from "./util/funcs.js"
import * as ease from "./util/ease.js"
let sketch = p => {
  let width = 400;
  p.setup = () => {
    let c = p.createCanvas(width, width);
    p.background(0);
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
  
  let p2i = pos => {
    return 4 * (pos[0] + pos[1] * width)
  }

  p.draw = () => {
    p.background(0);
    let time = p.millis()
    let center = [width/2, width/2];

    let n = time / 600;
    let theta = Math.PI* 2 * n
    let size = 20 + 40*(Math.sin(theta) + 1)
    p.textSize(size)
    p.fill(255);
    let text = "ものっちさん" 
    let i = Math.floor(n)%text.length;
    // p.text(text[i], ...center.map(e => e-size/2), ...center.map(e => e+size/2));
    text.split("").map( (text,n, arr) => {
      let pos = center.map((e,i) => 
        e + 100*[Math.sin,Math.cos][i](time/1000 -Math.PI * 2 * n/arr.length)
      )
      return { text, pos }
    } ).forEach( ({text, pos}) => {
      // p.text(text, ...pos.map( e=> e-size/2 ))
    p.text(text, ...pos.map(e => e-size/2), ...pos.map(e => e+size/2));
    })

    p.loadPixels();
    let num = 50**2;
    let circles = range(num)
      .map( i => i2xy(i, Math.sqrt(num)) )
      .map( ({x,y}) => 
        [x,y].map( e => lerp(0,Math.sqrt(num)-1,0,width, e))
        .map(e => Math.floor(e))
      ).map( ([x,y]) => {
        let index = 4 * (width * y + x);
        let r = p.pixels[index + 0]; 
        let g = p.pixels[index + 1]; 
        let b = p.pixels[index + 2];
        let c = p.color(r,g,b);
        return {
          pos: [x,y],
          color: c
        }
      })
    p.clear();
    circles.forEach( ({pos, color}) => {

      p.fill(color)
      p.ellipse(...pos, 6)
    } )
  }
}

export default sketch;
