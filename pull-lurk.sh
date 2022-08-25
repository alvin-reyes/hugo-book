#!/bin/bash

rm -rf static/lurk && mkdir -p static/lurk
rm -rf static/lurk-eval && mkdir -p static/lurk-eval

## download lurk-web-component
mkdir lurk-web-component
cd lurk-web-component
git clone https://github.com/jlogelin/lurk-web-component.git .
npm install
npm run build

cp -r dist/* ../static/lurk/

cd ../
rm -rf lurk-web-component
## download wasm-eval
mkdir wasm-eval
cd wasm-eval
git clone https://github.com/alvin-reyes/lurk-wasm-eval.git .
npm install --save-dev webpack
npm run build:release

cp -r lurk-rs-pkg ../static/lurk-eval/
cp -r pkg ../static/lurk-eval/
cp -r index.js ../static/lurk-eval/
cp -r dist/production/* ../static/lurk-eval/

cd ../
rm -rf wasm-eval