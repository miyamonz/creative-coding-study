let sketch = p => {
  p.setup = () => {
    p.createCanvas(300, 300);
    p.background(255);
  }
  p.draw = () => {
    p.ellipse(100,100,100)
  }
}

export default sketch;
