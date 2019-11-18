import 'proxy-polyfill/proxy.min.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
// import 'core-js/es/symbol';
// import 'core-js/es/weak-set';
import {expose} from '../comlink/dist/umd/comlink';

const obj = {
  counter: 0,
  inc() {
    this.counter++;
  }
};

expose(obj);