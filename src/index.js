import 'proxy-polyfill/proxy.min.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {wrap} from '../comlink/dist/umd/comlink';
async function init() {
   const worker = new Worker('./my.worker.js', {name: 'myWorky', type: 'module'});
   // WebWorkers use `postMessage` and therefore work with Comlink.
   const obj = {
	counter: {},
	inc: {}
  };
  const obj2 = wrap(worker, obj);
   alert(`Counter: ${await obj2.counter}`);
   await obj2.inc();
   alert(`Counter: ${await obj2.counter}`);
}
init();
