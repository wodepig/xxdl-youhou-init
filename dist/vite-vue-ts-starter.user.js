// ==UserScript==
// @name         hook_bug测试
// @namespace    npm/vite-plugin-monkey
// @version      0.0.0
// @author       monkey
// @description  hook_bug测试
// @license      MIT
// @icon         https://vitejs.dev/logo.svg
// @match        https://college.yingdao.com/
// @match        https://college.yingdao.com/course
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.12/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.8.5/dist/index.full.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.8.5/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const r=document.createElement("style");r.textContent=n,document.head.append(r)})(" :root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}.logo[data-v-11f4a5d6]{height:6em;padding:1.5em;will-change:filter}.logo[data-v-11f4a5d6]:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.vue[data-v-11f4a5d6]:hover{filter:drop-shadow(0 0 2em #42b883aa)}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.filter{filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)} ");

(function (vue, ElementPlus) {
  'use strict';

  function okMsg(title, msg = "") {
    msgShow(
      title,
      msg,
      "success"
      /* ok */
    );
  }
  function warnMsg(title, msg = "") {
    msgShow(
      title,
      msg,
      "warning"
      /* warn */
    );
  }
  function msgShow(title, msg, type) {
    if (msg) {
      ElementPlus.ElNotification({
        title,
        message: msg,
        type
      });
    } else {
      ElementPlus.ElNotification({
        title,
        type
      });
    }
  }
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "YingDao",
    setup(__props) {
      const textarea = vue.ref("");
      const textarea1 = vue.ref("");
      let oldFetch = fetch;
      function hookFetch(url, init) {
        return new Promise((resolve, reject) => {
          oldFetch.apply(this, arguments).then(async (response) => {
            let hookFlagUrl = isHook(arguments[0]);
            if (hookFlagUrl !== "") {
              console.log("hookFetch处理响应", window["listenUrl"]);
              const reader = response.body.getReader();
              const stream = new ReadableStream({
                start(controller) {
                  function push() {
                    reader.read().then((e) => {
                      let { done, value } = e;
                      const data = new TextDecoder("utf-8").decode(value);
                      console.log("我再打印?", data);
                      if (data) {
                        let jsonObject = JSON.parse(data);
                        parseLessonCatalog(jsonObject, hookFlagUrl);
                      }
                      if (done) {
                        controller.close();
                        return;
                      }
                      controller.enqueue(value);
                      push();
                    });
                  }
                  push();
                }
              });
              let ret = new Response(stream, { headers: { "Content-Type": "text/html" } });
              resolve(ret);
            } else {
              resolve(response);
            }
          });
        });
      }
      const startHook = () => {
        okMsg("开始hook");
        if (window["oldFetch"]) {
          warnMsg("已经hook过了");
          return;
        }
        let oldFetch2 = fetch;
        window["listenUrl"] = ["https://api.yingdao.com/api/college/v1/book/lessonCatalog?levelUuid", "https://api.yingdao.com/api/college/v1/exam/quizInfo?quizUuid="];
        window.fetch = hookFetch;
        window["oldFetch"] = oldFetch2;
        okMsg("hook成功");
      };
      const cancelHook = () => {
        okMsg("取消hook成功");
        window.fetch = window["oldFetch"];
        window["oldFetch"] = null;
      };
      const isHook = (arg1) => {
        const urls = window["listenUrl"];
        for (let url of urls) {
          if (arg1.startsWith(url)) {
            return url;
          }
        }
        return "";
      };
      function parseLessonCatalog(data, url) {
        console.log("进入解析数据,", data);
        if (url === "https://api.yingdao.com/api/college/v1/book/lessonCatalog?levelUuid") {
          let array = [];
          const catalog = data.data.catalog[0].catalog;
          for (let item of catalog) {
            array.push(item);
          }
          window.localStorage.setItem("lessonCatalog", JSON.stringify(array));
          textarea.value = JSON.stringify(array);
        }
        if (url === "https://api.yingdao.com/api/college/v1/exam/quizInfo?quizUuid=") {
          let array = [];
          const questionList = data.data.questionList;
          for (let item of questionList) {
            array.push(item);
          }
          window.localStorage.setItem("questionList", JSON.stringify(array));
          textarea1.value = JSON.stringify(array);
        }
      }
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_input = vue.resolveComponent("el-input");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_button, {
            round: "",
            onClick: startHook
          }, {
            default: vue.withCtx(() => _cache[2] || (_cache[2] = [
              vue.createTextVNode("开始监听")
            ])),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            round: "",
            onClick: cancelHook
          }, {
            default: vue.withCtx(() => _cache[3] || (_cache[3] = [
              vue.createTextVNode("取消监听")
            ])),
            _: 1
          }),
          vue.createVNode(_component_el_input, {
            modelValue: textarea.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textarea.value = $event),
            type: "textarea",
            min: 2
          }, null, 8, ["modelValue"]),
          vue.createVNode(_component_el_input, {
            modelValue: textarea1.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => textarea1.value = $event),
            type: "textarea",
            min: 2
          }, null, 8, ["modelValue"])
        ], 64);
      };
    }
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$1);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-11f4a5d6"]]);
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("element-plus/dist/index.css");
  const app = vue.createApp(App);
  app.use(ElementPlus);
  app.mount(
    (() => {
      const app2 = document.createElement("div");
      document.body.append(app2);
      return app2;
    })()
  );

})(Vue, ElementPlus);
