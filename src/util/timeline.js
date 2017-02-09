class Motion {
  constructor({from, to, length = 1, func}){
    Object.assign(this, {from, to, length, func})
  }
}
export default class {
  constructor(){
    this.current;
    this.motions = [];
  }
  moveTo(to, length = 1, ease = t => t) {
    let from = this.motions[this.motions.length -1].to;
    let func = t => {
      t /= length;
      t = ease(t)
      return [0,1].map( i => to[i]*t + from[i]*(1-t) )
    }
    this.motions.push(new Motion({from, to, length, func}))
    return this
  }
  then(e, length = 1) {
    if(typeof e !== "function")
      this.current = e;
    else {
      this.motions.push(new Motion({from: e(0), to: e(length),length, func: e}))
    }
    return this;

  }
  func(t){
    let amari = t;
    let i = 0;
    while(i < this.motions.length && amari > this.motions[i].length){
      amari -= this.motions[i].length;
      i++;
    }
    if(i >= this.motions.length) 
      return this.motions[this.motions.length -1].to;
    else
      return this.motions[i].func(amari)
  }

}
