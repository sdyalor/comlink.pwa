import 'proxy-polyfill/proxy.min.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import 'proxy-polyfill';
// import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
// import 'core-js/es/symbol';
// import 'core-js/es/weak-set';
import { Comlink } from '../comlink/comlink';
// const obj = {
//   counter: 0,
//   inc() {
//     this.counter++;
//   }
// };

// Comlink.expose(obj);

// var i = 0;

// function timedCount() {
//   postMessage(`${wrap}`);
// }
// timedCount();
const obj = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

Comlink.expose(obj, self);