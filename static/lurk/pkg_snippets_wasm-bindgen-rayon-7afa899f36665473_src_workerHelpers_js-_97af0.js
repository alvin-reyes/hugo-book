"use strict";
(self["webpackChunkLurk_web_REPL"] = self["webpackChunkLurk_web_REPL"] || []).push([["pkg_snippets_wasm-bindgen-rayon-7afa899f36665473_src_workerHelpers_js-_97af0"],{

/***/ "./pkg/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js":
/*!*******************************************************************************!*\
  !*** ./pkg/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startWorkers": () => (/* binding */ startWorkers)
/* harmony export */ });
/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: we use `wasm_bindgen_worker_`-prefixed message types to make sure
// we can handle bundling into other files, which might happen to have their
// own `postMessage`/`onmessage` communication channels.
//
// If we didn't take that into the account, we could send much simpler signals
// like just `0` or whatever, but the code would be less resilient.

function waitForMsgType(target, type) {
  return new Promise(resolve => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data == null || data.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

waitForMsgType(self, 'wasm_bindgen_worker_init').then(async data => {
  // # Note 1
  // Our JS should have been generated in
  // `[out-dir]/snippets/wasm-bindgen-rayon-[hash]/workerHelpers.js`,
  // resolve the main module via `../../..`.
  //
  // This might need updating if the generated structure changes on wasm-bindgen
  // side ever in the future, but works well with bundlers today. The whole
  // point of this crate, after all, is to abstract away unstable features
  // and temporary bugs so that you don't need to deal with them in your code.
  //
  // # Note 2
  // This could be a regular import, but then some bundlers complain about
  // circular deps.
  //
  // Dynamic import could be cheap if this file was inlined into the parent,
  // which would require us just using `../../..` in `new Worker` below,
  // but that doesn't work because wasm-pack unconditionally adds
  // "sideEffects":false (see below).
  //
  // OTOH, even though it can't be inlined, it should be still reasonably
  // cheap since the requested file is already in cache (it was loaded by
  // the main thread).
  const pkg = await __webpack_require__.e(/*! import() */ "pkg_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../.. */ "./pkg/index.js"));
  await pkg.default(data.module, data.memory);
  postMessage({ type: 'wasm_bindgen_worker_ready' });
  pkg.wbg_rayon_start_worker(data.receiver);
});

// Note: this is never used, but necessary to prevent a bug in Firefox
// (https://bugzilla.mozilla.org/show_bug.cgi?id=1702191) where it collects
// Web Workers that have a shared WebAssembly memory with the main thread,
// but are not explicitly rooted via a `Worker` instance.
//
// By storing them in a variable, we can keep `Worker` objects around and
// prevent them from getting GC-d.
let _workers;

async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    module,
    memory,
    receiver: builder.receiver()
  };

  _workers = await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      // Self-spawn into a new Worker.
      //
      // TODO: while `new URL('...', import.meta.url) becomes a semi-standard
      // way to get asset URLs relative to the module across various bundlers
      // and browser, ideally we should switch to `import.meta.resolve`
      // once it becomes a standard.
      //
      // Note: we could use `../../..` as the URL here to inline workerHelpers.js
      // into the parent entry instead of creating another split point -
      // this would be preferable from optimization perspective -
      // however, Webpack then eliminates all message handler code
      // because wasm-pack produces "sideEffects":false in package.json
      // unconditionally.
      //
      // The only way to work around that is to have side effect code
      // in an entry point such as Worker file itself.
      const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("pkg_snippets_wasm-bindgen-rayon-7afa899f36665473_src_workerHelpers_js-_97af1"), __webpack_require__.b), {
        type: undefined
      });
      worker.postMessage(workerInit);
      await waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      return worker;
    })
  );
  builder.build();
}


/***/ })

}]);
//# sourceMappingURL=pkg_snippets_wasm-bindgen-rayon-7afa899f36665473_src_workerHelpers_js-_97af0.js.map