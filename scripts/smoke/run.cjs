const { JSDOM } = require("jsdom");
const dom = new JSDOM('<!doctype html><div id="root"></div>', { pretendToBeVisual: true, url: "http://localhost/" });
const w = dom.window;
global.window = w; global.document = w.document; global.navigator = w.navigator;
global.IntersectionObserver = class { constructor(cb){this.cb=cb;} observe(el){ setTimeout(()=>this.cb([{isIntersecting:true,target:el}]),50);} disconnect(){} };
w.IntersectionObserver = global.IntersectionObserver;
w.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
global.requestAnimationFrame = (f)=>setTimeout(()=>f(performance.now()),16); global.cancelAnimationFrame = clearTimeout;
w.requestAnimationFrame = global.requestAnimationFrame;
w.HTMLCanvasElement.prototype.getContext = () => ({ clearRect(){}, fillRect(){}, setTransform(){}, set fillStyle(v){} });
global.IS_REACT_ACT_ENVIRONMENT = false;
const { run } = require("./bundle.cjs");
(async () => {
  for (const v of ["clients","peers"]) {
    const errs = await run(v);
    const reveals = document.querySelectorAll(".reveal.in").length;
    const counters = [...document.querySelectorAll(".counter-num")].map(e=>e.textContent);
    console.log(v, "| errors:", errs, "| reveals triggered:", reveals, "| counters:", counters.join(", "));
    document.getElementById("root").innerHTML = "";
  }
  process.exit(0);
})();
