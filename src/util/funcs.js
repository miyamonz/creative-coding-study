export const range = (from, to) => {
  if(to === undefined) [to, from] = [from, 0];
  let a = [];
  for(let i=from; i<to; i++){
    a.push(i)
  }
  return a
}

export const  i2xy = (i, width) => {
  return {x: i%width, y:(i-i%width)/width}
}

export const cycle = (theta, variable = {bias: 0, freq: 1}) => {
  return [Math.sin, Math.cos].map(f => f(theta * 2 * Math.PI / variable.freq))
}

export const add = n => {
  if(typeof n ==="number") return e => e+n;
  else if(typeof n === "object" && n.length >= 2) {
    return (e,i) => e+n[i]
  }
}
export const lerp = (x0, x1, y0, y1, x) => {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}
