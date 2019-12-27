import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import OMT from "@surma/rollup-plugin-off-main-thread";
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';


const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];
const babelRc = {
  ignore : [
    /\/core-js/,
    /\/regenerator-runtime/
  ],
  sourceType: "unambiguous",
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
    // '@babel/preset-typescript'
  ],
  plugins: [
    ["@babel/plugin-transform-arrow-functions", { "spec": true }],
    ['@babel/plugin-transform-template-literals'],
    // ['@babel/plugin-syntax-dynamic-import'],
    // [
    //   '@babel/plugin-proposal-decorators',
    //   { decoratorsBeforeExport: true }
    // ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-syntax-import-meta']
  ]
};
const babelConf = {
  extensions,
  babelrc: false,
  ...babelRc,
};

export default [
  {
    input: "src/index.js",
    output: {
      // dir: "dist",
      format: "iife",
      sourcemap: true,
      file: 'dist/index.js'
    },
    plugins: [
      nodeResolve({extensions}),
      commonjs({
        namedExports: {
        }
      }),
      babel(babelConf),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      copy({
      })
    ]
  },
  {
    input: "src/my.worker.js",
    output: {
      // dir: "dist",
      format: "iife",
      sourcemap: true,
      file: 'dist/my.worker.js'
    },
    plugins: [
      nodeResolve({extensions}),
      commonjs({
        namedExports: {
        }
      }),
      babel(babelConf),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      copy({
      })
    ]
  }
];