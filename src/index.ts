import 'proxy-polyfill/proxy.min.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'promise-polyfill/src/polyfill';

import 'whatwg-fetch';
// import ES6Promise from 'es6-promise';
// ES6Promise.polyfill();

// import {wrap} from 'comlink/src/comlink';
import {Comlink} from '../comlink/comlink'
// async function init() {
//   const worker = new Worker('./my.worker.ts', {type: 'module'});
//   // WebWorkers use `postMessage` and therefore work with Comlink.
//   const obj = wrap(worker);
//   alert(`Counter: ${await obj.counter}`);
//   await obj.inc();
//   alert(`Counter: ${await obj.counter}`);
// }
// init();


// const invoke = async () => {
//   let w = new Worker("./my.worker.js", { type: 'module' });
//   let obj = await Comlink.proxy(w);
//   console.log(`wrap is type of: `,typeof obj);
//   console.log(`this is wrap`, Comlink.proxy);
//   console.log(`this is the Worker`, w);
//   alert(`${await obj.counter}`);

//   w.onmessage = function(event){
//     document.getElementById("root").innerHTML = event.data;
//   };
// }
// setTimeout(x => invoke(), 1000);

// async function init() {
//   setInterval( x =>
//     console.log('hi'), 10000
//   )
// }
// init();
async function init() {
  const worker = new Worker('./my.worker.js',{type: 'module'});
  // WebWorkers use `postMessage` and therefore work with Comlink.
  const obj = Comlink.proxy(worker);
  alert(`Counter: ${await obj.counter}`);
  await obj.inc();
  alert(`Counter: ${await obj.counter}`);
};
init();