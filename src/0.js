let sketch = p => {
  let width = 400;
  p.setup = () => {
    p.createCanvas(width, width);
    p.background(255);
    p.strokeWeight(0)
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
    let num = [...Array(100).keys()];
    num.forEach( i => {
      let x = i%10;
      let y = (i-x)/10;
      let diff = [Math.sin, Math.cos].map(f => 5 * f(time/300 + i))
      let pos = [x,y]
        .map(e => (e+0.5)/10*width)
        .map((e,i) => e+diff[i])

      p.fill(color(i/100 + time/60));
      let w = 1 + Math.sin(time/20 + i)
      
      p.ellipse(...pos,10 + 10*w)
    } )
  }
}

export default sketch;
