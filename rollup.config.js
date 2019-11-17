import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import OMT from "@surma/rollup-plugin-off-main-thread";
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';


const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];
const babelRc = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          ie: 11
        },
        useBuiltIns: 'entry',
        corejs: 3,
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-syntax-import-meta']
  ]
};
const babelConf = {
  extensions,
  babelrc: false,
  ...babelRc,
  exclude: [
    /@babel(?:\/|\\{1,2})runtime|core-js/
  ]
};

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "amd",
    sourcemap: true
  },
  plugins: [
    OMT(),
    nodeResolve({extensions}),
    commonjs({
      namedExports: {
        react: [
          "Component",
          "useContext",
          "useMemo",
          "useEffect",
          "useLayoutEffect",
          "useRef",
          "useReducer",
          "createElement"
        ],
        "react-is": ["isValidElementType", "isContextConsumer"],
        "react-dom": ["unstable_batchedUpdates"]
      }
    }),
    babel(babelConf),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'node_modules/es-module-loader/*', dest: 'dist/node_modules/es-module-loader/'}
      ]
    })
  ]
};