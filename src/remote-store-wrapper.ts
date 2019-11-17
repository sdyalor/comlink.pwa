import { proxy } from "comlink";

export default async function(store) {
  const subscribers = new Set();

  let latestState = await store.getState();
  store.subscribe(
    proxy(async () => {
      latestState = await store.getState();
      subscribers.forEach(f => f());
    })
  );
  return {
    dispatch: action => store.dispatch(action),
    getState: () => latestState,
    subscribe: listener => {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
    replaceReducer: () => {
      throw new Error("Can’t transfer a function");
    }
  };
}

// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.default = _default;

// var _comlink = require("comlink");

// function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

// function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function _default(_x) {
//   return _ref.apply(this, arguments);
// }

// function _ref() {
//   _ref = _asyncToGenerator(
//   /*#__PURE__*/
//   regeneratorRuntime.mark(function _callee2(store) {
//     var subscribers, latestState;
//     return regeneratorRuntime.wrap(function _callee2$(_context2) {
//       while (1) {
//         switch (_context2.prev = _context2.next) {
//           case 0:
//             subscribers = new Set();
//             _context2.next = 3;
//             return store.getState();

//           case 3:
//             latestState = _context2.sent;
//             store.subscribe((0, _comlink.proxy)(
//             /*#__PURE__*/
//             _asyncToGenerator(
//             /*#__PURE__*/
//             regeneratorRuntime.mark(function _callee() {
//               return regeneratorRuntime.wrap(function _callee$(_context) {
//                 while (1) {
//                   switch (_context.prev = _context.next) {
//                     case 0:
//                       _context.next = 2;
//                       return store.getState();

//                     case 2:
//                       latestState = _context.sent;
//                       subscribers.forEach(function (f) {
//                         return f();
//                       });

//                     case 4:
//                     case "end":
//                       return _context.stop();
//                   }
//                 }
//               }, _callee);
//             }))));
//             return _context2.abrupt("return", {
//               dispatch: function dispatch(action) {
//                 return store.dispatch(action);
//               },
//               getState: function getState() {
//                 return latestState;
//               },
//               subscribe: function subscribe(listener) {
//                 subscribers.add(listener);
//                 return function () {
//                   return subscribers.delete(listener);
//                 };
//               },
//               replaceReducer: function replaceReducer() {
//                 throw new Error("Can’t transfer a function");
//               }
//             });

//           case 6:
//           case "end":
//             return _context2.stop();
//         }
//       }
//     }, _callee2);
//   }));
//   return _ref.apply(this, arguments);
// }