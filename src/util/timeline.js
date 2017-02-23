class Motion {
  constructor({from, to, length = 1, ease}){
    let func = t => {
      t /= length;
      t = ease(t)
      return [0,1].map( i => to[i]*t + from[i]*(1-t) )
    }
    Object.assign(this, {from, to, length, func})
  }
}

function getMotion(time, motions, flags){
  let t       = time;
  let current = 0;
  let num     = 0;
  let last    = motions[motions.length-1];
  let state   = [];
  let stacks  = [];

  for(let num=0; num <= motions.length; num++){
    if(stacks.length > 100) break
    if(num !== motions.length) stacks.push(num)
    let found  = flags.find( e => e.pos === num );
    if(found){
      state.push({
        name: found.name,
        type: found.type,
        current,
        num});
      if(found.type === "default") {
      }else if(found.type === "back"){
        let backState = state.find( e => e.name === found.name && e.type !== "back" );
        let fromState = state.find( e => e.name === found.name && e.type === "back" );
        num = backState.num-1
      }
    }
  }

  let index, param;
  stacks.map( e => motions[e] )
    .reduce((prev,curr, i, a) => {
      let add = curr ? curr.length : 0;
      if(prev < time && time <= prev + add){
        index = i;
        param = time - prev;
      }
      return  add + prev;
    },0)
  return {motion: motions[stacks[index]], param}
}

export default class {
  constructor(){
    this.current;
    this.motions = [];
    this.flags = [];
    this.flag("start");
  }
  flag(name,type="default"){
    this.flags.push({
      name,
      type,
      pos: this.motions.length,
    })
  }
  repeat(name="start", time="infinite"){
    this.flag(name,"back");
    return this;
  }

  moveTo(to, length = 0, ease = t => t) {
    let from = this.motions[this.motions.length -1].to;
    this.motions.push(new Motion({from, to, length, ease}))
    return this
  }
  then(e, length = 0) {
    this.motions.push(new Motion({from: e, to: e,length, ease: t => t}))
    return this;
  }
  func(t){
    let {motion, param} = getMotion(t, this.motions, this.flags);
    return motion.func(param)
  }

}
