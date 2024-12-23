// ==UserScript==
// @name         vite-vue-ts-starter
// @namespace    npm/vite-plugin-monkey
// @version      0.0.0
// @author       monkey
// @description  油猴快速开发
// @license      MIT
// @icon         https://vitejs.dev/logo.svg
// @match        https://www.baidu.com/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.12/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.8.5/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.8.5/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const r=document.createElement("style");r.textContent=n,document.head.append(r)})(" *,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.w-100\\%,.w-full{width:100%}.flex{display:flex}.flex-row{flex-direction:row}.items-center{align-items:center}.rounded-5{border-radius:5px}.rounded-l-20{border-top-left-radius:20px;border-bottom-left-radius:20px}.bg-blue-300{--un-bg-opacity:1;background-color:rgb(147 197 253 / var(--un-bg-opacity))}.bg-blue-500{--un-bg-opacity:1;background-color:rgb(59 130 246 / var(--un-bg-opacity))}.bg-gray-200{--un-bg-opacity:1;background-color:rgb(229 231 235 / var(--un-bg-opacity))}.bg-red-300{--un-bg-opacity:1;background-color:rgb(252 165 165 / var(--un-bg-opacity))}.px-5{padding-left:5px;padding-right:5px}.py-5{padding-top:5px;padding-bottom:5px}.text-center{text-align:center}.color-black{--un-text-opacity:1;color:rgb(0 0 0 / var(--un-text-opacity))}.font-bold{font-weight:700} ");

(function (vue, ElementPlus, jquery) {
  'use strict';

  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  function clearLogHandle() {
    okMsg("日志已清空");
    window.logListSize = 0;
    window.logList = [];
    jquery("#el-log-main").empty();
  }
  function filterLogList(type) {
    const logMain = jquery("#el-log-main");
    logMain.empty();
    let list = window.logList;
    if (type !== "all") {
      list = list.filter((i) => {
        return i.type === type;
      });
    }
    const dDiv = jquery("<div></div>");
    list.forEach((i) => {
      dDiv.append(getPByLog(i));
    });
    logMain.get()[0].append(dDiv.get()[0]);
  }
  function printLog(msg, type = "info") {
    if (!window.logListSize) {
      window.logListSize = 0;
    }
    let pojo = {
      type,
      msg,
      id: window.logListSize + 1
    };
    window.logListSize = pojo.id;
    const logMain = jquery("#el-log-main").get()[0];
    let log = getPByLog(pojo);
    logMain.prepend(log[0]);
    window.logList.unshift(pojo);
    if (type === "err") {
      errMsg(msg);
    }
  }
  function getPByLog(log) {
    const msg = log.id + " " + log.msg;
    let tex = jquery(`<p class="scrollbar-demo-item">${msg}</p>`);
    if (log.type === "warn") {
      tex = jquery(`<p style="color:indianred">${msg}</p>`);
    }
    if (log.type === "err") {
      tex = jquery(`<p style="color:darkred">${msg}</p>`);
    }
    tex.get()[0].style.whiteSpace = "pre-wrap";
    return tex;
  }
  function okMsg(title, msg = "") {
    msgShow(
      title,
      msg,
      "success"
      /* ok */
    );
  }
  function errMsg(title, msg = "") {
    msgShow(
      title,
      msg,
      "error"
      /* err */
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
  function sleep(time) {
    const rate = window["sleepRate"] ? window["sleepRate"] : 3;
    time = rate * time;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, time);
    });
  }
  function GmGet(url) {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        url,
        method: "GET",
        onload: function(xhr) {
          resolve(xhr.responseText);
        }
      });
    });
  }
  const _hoisted_1$2 = { class: "flex-row w-full" };
  const _hoisted_2 = { class: "bg-blue-300 px-5 py-5 rounded-l-20" };
  const _hoisted_3 = { class: "bg-red-300 px-5 py-5 rounded-l-20" };
  const _hoisted_4 = { class: "bg-blue-500 px-5 py-5 rounded-l-20" };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "MainPage",
    setup(__props) {
      const debugInfo = vue.ref(false);
      const forceStop = vue.ref(false);
      const configInfo = vue.ref({
        key: "123456",
        url: "https://api.qjqq.cn/api/Yi",
        sleepRate: 3
      });
      const setSleepRate = () => {
        if (configInfo.value.sleepRate && configInfo.value.sleepRate > 0) {
          window["sleepRate"] = configInfo.value.sleepRate;
        } else {
          window["sleepRate"] = 3;
        }
        okMsg("设置成功");
      };
      const movieSentence = async () => {
        let url = configInfo.value.url + "?c=h";
        let resp = await GmGet(url);
        let json = JSON.parse(resp);
        printLog(json.hitokoto);
      };
      const randomSentence = async () => {
        let url = configInfo.value.url + "?c=h";
        let resp = await GmGet(url);
        let json = JSON.parse(resp);
        printLog(json.from + ":" + json.hitokoto);
      };
      const random3Sentence = async () => {
        for (let index = 0; index < 3; index++) {
          await randomSentence();
          await sleep(1e3);
        }
      };
      return (_ctx, _cache) => {
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_input_number = vue.resolveComponent("el-input-number");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          vue.createVNode(_component_el_divider, { "content-position": "left" }, {
            default: vue.withCtx(() => _cache[8] || (_cache[8] = [
              vue.createTextVNode("基本信息")
            ])),
            _: 1
          }),
          vue.createElementVNode("div", _hoisted_2, [
            vue.createVNode(_component_el_row, null, {
              default: vue.withCtx(() => [
                !forceStop.value ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  round: "",
                  type: "warning",
                  onClick: _cache[0] || (_cache[0] = ($event) => forceStop.value = !forceStop.value)
                }, {
                  default: vue.withCtx(() => _cache[9] || (_cache[9] = [
                    vue.createTextVNode("暂停")
                  ])),
                  _: 1
                })) : vue.createCommentVNode("", true),
                forceStop.value ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 1,
                  round: "",
                  type: "success",
                  onClick: _cache[1] || (_cache[1] = ($event) => forceStop.value = !forceStop.value)
                }, {
                  default: vue.withCtx(() => _cache[10] || (_cache[10] = [
                    vue.createTextVNode("继续")
                  ])),
                  _: 1
                })) : vue.createCommentVNode("", true),
                vue.createVNode(_component_el_button, {
                  round: "",
                  type: "danger",
                  onClick: _cache[2] || (_cache[2] = ($event) => debugInfo.value = !debugInfo.value)
                }, {
                  default: vue.withCtx(() => _cache[11] || (_cache[11] = [
                    vue.createTextVNode("调试")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_row, { class: "px-5 py-5" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input, {
                  modelValue: configInfo.value.key,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => configInfo.value.key = $event),
                  style: { "max-width": "600px" },
                  placeholder: "请输入密钥"
                }, {
                  prepend: vue.withCtx(() => _cache[12] || (_cache[12] = [
                    vue.createTextVNode("密钥:")
                  ])),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_row, { class: "px-5 py-5 items-center" }, {
              default: vue.withCtx(() => [
                _cache[14] || (_cache[14] = vue.createElementVNode("p", { class: "color-black text-center font-bold" }, "等待倍率: ", -1)),
                vue.createVNode(_component_el_input_number, {
                  modelValue: configInfo.value.sleepRate,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => configInfo.value.sleepRate = $event),
                  min: 1,
                  max: 10
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_el_button, {
                  round: "",
                  type: "danger",
                  onClick: setSleepRate
                }, {
                  default: vue.withCtx(() => _cache[13] || (_cache[13] = [
                    vue.createTextVNode("设置")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          vue.createVNode(_component_el_divider, { "content-position": "left" }, {
            default: vue.withCtx(() => _cache[15] || (_cache[15] = [
              vue.createTextVNode("功能区1")
            ])),
            _: 1
          }),
          vue.withDirectives(vue.createVNode(_component_el_divider, { "content-position": "left" }, {
            default: vue.withCtx(() => _cache[16] || (_cache[16] = [
              vue.createTextVNode("调试区")
            ])),
            _: 1
          }, 512), [
            [vue.vShow, debugInfo.value]
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_3, [
            vue.createVNode(_component_el_row, { class: "flex" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_button, {
                  round: "",
                  onClick: _cache[5] || (_cache[5] = ($event) => vue.unref(printLog)("一条普通日志"))
                }, {
                  default: vue.withCtx(() => _cache[17] || (_cache[17] = [
                    vue.createTextVNode("普通日志")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  round: "",
                  onClick: _cache[6] || (_cache[6] = ($event) => vue.unref(printLog)("一条错误日志", "err"))
                }, {
                  default: vue.withCtx(() => _cache[18] || (_cache[18] = [
                    vue.createTextVNode("错误日志")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  round: "",
                  onClick: _cache[7] || (_cache[7] = ($event) => vue.unref(errMsg)("错误消息"))
                }, {
                  default: vue.withCtx(() => _cache[19] || (_cache[19] = [
                    vue.createTextVNode("错误消息")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            })
          ], 512), [
            [vue.vShow, debugInfo.value]
          ]),
          vue.createVNode(_component_el_divider, { "content-position": "left" }, {
            default: vue.withCtx(() => _cache[20] || (_cache[20] = [
              vue.createTextVNode("一言句子")
            ])),
            _: 1
          }),
          vue.createElementVNode("div", _hoisted_4, [
            vue.createVNode(_component_el_row, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_button, {
                  round: "",
                  type: "success",
                  onClick: movieSentence
                }, {
                  default: vue.withCtx(() => _cache[21] || (_cache[21] = [
                    vue.createTextVNode("影视句子")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  round: "",
                  type: "success",
                  onClick: randomSentence
                }, {
                  default: vue.withCtx(() => _cache[22] || (_cache[22] = [
                    vue.createTextVNode("随机句子")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  round: "",
                  type: "success",
                  onClick: random3Sentence
                }, {
                  default: vue.withCtx(() => _cache[23] || (_cache[23] = [
                    vue.createTextVNode("循环三次(测等待倍率)")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]);
      };
    }
  });
  const _hoisted_1$1 = { class: "bg-gray-200 w-100% px-5 py-5 rounded-5" };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "ConsoleShow",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_divider, { "content-position": "left" }, {
            default: vue.withCtx(() => _cache[3] || (_cache[3] = [
              vue.createTextVNode("日志展示")
            ])),
            _: 1
          }),
          vue.createElementVNode("div", _hoisted_1$1, [
            vue.createVNode(_component_el_button, {
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(filterLogList)("all"))
            }, {
              default: vue.withCtx(() => _cache[4] || (_cache[4] = [
                vue.createTextVNode("全部")
              ])),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(filterLogList)("warn")),
              type: "warning"
            }, {
              default: vue.withCtx(() => _cache[5] || (_cache[5] = [
                vue.createTextVNode("警告")
              ])),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(filterLogList)("err")),
              type: "danger"
            }, {
              default: vue.withCtx(() => _cache[6] || (_cache[6] = [
                vue.createTextVNode("错误")
              ])),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              onClick: vue.unref(clearLogHandle),
              type: "info"
            }, {
              default: vue.withCtx(() => _cache[7] || (_cache[7] = [
                vue.createTextVNode("清空")
              ])),
              _: 1
            }, 8, ["onClick"]),
            vue.createVNode(_component_el_scrollbar, {
              id: "el-log-main",
              height: "400px"
            })
          ])
        ], 64);
      };
    }
  });
  function getOneById(id, eleName = "", needThrow = true) {
    const eles = jquery(`#${id}`);
    if (eles.length === 1) {
      return eles[0];
    }
    if (needThrow) {
      errMsg("元素获取失败", eleName);
    } else {
      return null;
    }
  }
  function getOneBySelect(xpath, eleName = "", needThrow = true) {
    const eles = jquery(xpath);
    if (eles.length === 1) {
      return eles[0];
    }
    if (needThrow) {
      errMsg("元素获取失败", eleName);
    } else {
      return null;
    }
  }
  const _hoisted_1 = { class: "w-100%" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const mainPageShow = vue.ref(false);
      const sleepLock = async () => {
        await sleep(500);
        console.log("清除");
        window.lockInitSkip = false;
      };
      const init = async () => {
        window.lockInit = true;
        await sleep(600);
        const consoleBtn = getOneById("consoleBtn", "控制台按钮", false);
        if (consoleBtn) {
          window.lockInitSkip = true;
          window.lockInit = false;
          sleepLock();
          console.log("已初始化");
          return;
        }
        let main = null;
        console.log("重新已初始化");
        console.log(window.location.href);
        if (window.location.href === "https://www.baidu.com/") {
          main = getOneById("s-top-left", "左上角列表");
        } else {
          main = getOneBySelect(".cr-title.c-gap-bottom-xsmall", "热榜");
        }
        window.logList = [];
        let div = document.createElement("div");
        div.setAttribute("float", "right");
        let consoleBtnHtml = '<button id="consoleBtn" class="" style="line-height:30px;font-weight: 600;padding-right: 1px;padding-top: 2px;padding-bottom: 2px;border-radius: 30px; background-color:#0cc1ff; color:#ffffff">点这里</button>';
        div.innerHTML = consoleBtnHtml;
        if (main) {
          main.append(div);
        }
        jquery("#consoleBtn").on("click", function() {
          changeMainPage();
        });
        window.lockInit = false;
      };
      const changeMainPage = () => {
        mainPageShow.value = !mainPageShow.value;
      };
      var _wr = function(type) {
        var orig = history[type];
        return function() {
          var rv = orig.apply(this, arguments);
          var e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");
      history.replaceState = _wr("replaceState");
      vue.onMounted(() => {
        init();
        window.addEventListener("replaceState", function(e) {
          if (window.lockInit || window.lockInitSkip) {
            return;
          }
          console.log("THEY DID IT AGAIN! replaceState 111111");
          init();
        });
        window.addEventListener("popstate", function(event) {
          if (window.lockInit || window.lockInitSkip) {
            return;
          }
          init();
        });
        window.addEventListener("pushState", function(e) {
          if (window.lockInit || window.lockInitSkip) {
            return;
          }
          console.log("THEY DID IT AGAIN! pushState 2222222");
          init();
        });
      });
      return (_ctx, _cache) => {
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        return vue.openBlock(), vue.createBlock(_component_el_dialog, {
          modelValue: mainPageShow.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => mainPageShow.value = $event),
          title: "控制台(vip)_0.0.1",
          width: "1000",
          draggable: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("div", _hoisted_1, [
              vue.createVNode(_component_el_row, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_col, { span: 11 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_sfc_main$2)
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 1 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_divider, {
                        style: { "height": "100%" },
                        direction: "vertical"
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 11 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_sfc_main$1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ], 512), [
              [vue.vShow, mainPageShow.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("element-plus/dist/index.css");
  const app = vue.createApp(_sfc_main);
  app.use(ElementPlus);
  app.mount(
    (() => {
      const app2 = document.createElement("div");
      document.body.append(app2);
      return app2;
    })()
  );

})(Vue, ElementPlus, jQuery);