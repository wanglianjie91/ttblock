// ==UserScript==
// @name         ttblock
// @namespace    npm/vite-plugin-monkey
// @version      0.0.1
// @author       tatoo
// @description  常用中文网站增强, 例如某乎等
// @icon         https://vitejs.dev/logo.svg
// @include      *://www.zhihu.com/*
// @resource     setting  ./setting.html
// @sandbox      raw
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @grant        GM.setValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const field_names = [
    "home-side",
    "home-video",
    "home-ads",
    "search-side",
    "search-kfe"
  ];
  const get_values = async function() {
    const result = {};
    for (const item of field_names) {
      result[item] = await _GM.getValue(item, "0");
    }
    return result;
  };
  function registerSetting() {
    let insert = false;
    const shadowDOM = document.createElement("div").attachShadow({ mode: "open" });
    shadowDOM.innerHTML = `
  <style>
    html,
    body,
    h1,
    h2,
    div,
    input {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      color: rgb(25, 27, 31);
    }
    h1 {
      font-size: 18px;
      text-align: center;
      padding-block-end: 5px;
    }
    h2 {
      font-size: 14px;
      font-weight: normal;
    }
    legend {
      font-size: 16px;
      font-weight: bold;
    }
    .mask {
      position: fixed;
      z-index: 9999;
      background-color: #efe;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      border: 1px solid red;
      width: 20px;
      height: 20px;
      font-size: 18px;
      color: red;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
    }
    .card {
      background-color: #fef;
      padding: 5px 10px;
    }
    .part {
      margin-bottom: 10px;
    }
    .item {
      margin-block: 4px;
      display: flex;
      font-size: 12px;
    }
    .item-label {
      width: 80px;
    }
    .item-field {
      flex: 1;
      display: flex;
    }
    .field {
      display: flex;
      align-items: center;
      margin-inline-end: 15px;
    }
    .field label {
      margin-right: 4px;
    }
    button.save {
      margin-block-start: 10px;
      float: right;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button.save:hover {
      background-color: #0056b3;
    }
    </style>
    <div class="mask" id="mask_setting">
      <div class="close" id="close_setting">x</div>
      <div class="container">
        <h1>ttblock Settings</h1>
        <fieldset class="card" data-for="zhihu">
          <legend>某乎</legend>
          <div class="part">
            <h2>首页-推荐</h2>
            <div class="item">
              <label class="item-label">隐藏侧边栏:</label>
              <div class="item-field">
                <div class="field">
                  <label for="home-side-1">是</label>
                  <input
                    type="radio"
                    name="home-side"
                    id="home-side-1"
                    value="1"
                  />
                </div>
                <div class="field">
                  <label for="home-side-0">否</label>
                  <input
                    type="radio"
                    name="home-side"
                    id="home-side-0"
                    value="0"
                  />
                </div>
              </div>
            </div>
            <div class="item">
              <label class="item-label">隐藏视频:</label>
              <div class="item-field">
                <div class="field">
                  <label for="home-video-1">是</label>
                  <input
                    type="radio"
                    name="home-video"
                    id="home-video-1"
                    value="1"
                  />
                </div>
                <div class="field">
                  <label for="home-video-0">否</label>
                  <input
                    type="radio"
                    name="home-video"
                    id="home-video-0"
                    value="0"
                  />
                </div>
              </div>
            </div>
            <div class="item">
              <label class="item-label">隐藏广告:</label>
              <div class="item-field">
                <div class="field">
                  <label for="home-ads-1">是</label>
                  <input
                    type="radio"
                    name="home-ads"
                    id="home-ads-1"
                    value="1"
                  />
                </div>
                <div class="field">
                  <label for="home-ads-0">否</label>
                  <input
                    type="radio"
                    name="home-ads"
                    id="home-ads-0"
                    value="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="part">
            <h2>搜索结果页面</h2>
            <div class="item">
              <label class="item-label">隐藏侧边栏:</label>
              <div class="item-field">
                <div class="field">
                  <label for="search-side-1">是</label>
                  <input
                    type="radio"
                    name="search-side"
                    id="search-side-1"
                    value="1"
                  />
                </div>
                <div class="field">
                  <label for="search-side-0">否</label>
                  <input
                    type="radio"
                    name="search-side"
                    id="search-side-0"
                    value="0"
                  />
                </div>
              </div>
            </div>
            <div class="item">
              <label class="item-label">隐藏盐选:</label>
              <div class="item-field">
                <div class="field">
                  <label for="search-kfe-1">是</label>
                  <input
                    type="radio"
                    name="search-kfe"
                    id="search-kfe-1"
                    value="1"
                  />
                </div>
                <div class="field">
                  <label for="search-kfe-0">否</label>
                  <input
                    type="radio"
                    name="search-kfe"
                    id="search-kfe-0"
                    value="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <button id="save" class="save">保存</button>
      </div>
    </div>;`;
    const setInitialValue = async () => {
      const defaultValues = await get_values();
      field_names.forEach((name) => {
        const radios = document.getElementsByName(name);
        radios.forEach((radio) => {
          if (radio.value === defaultValues[name]) {
            radio.checked = true;
          }
        });
      });
    };
    const submit = async () => {
      field_names.forEach((name) => {
        const radios = document.getElementsByName(name);
        radios.forEach((radio) => {
          if (radio.checked) {
            _GM_setValue(name, radio.value);
          }
        });
      });
      alert("设置已保存，请刷新页面!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
    const toggleSetting = function(hide = true) {
      const mask = document.getElementById("mask_setting");
      if (!mask) return;
      hide ? mask.style.display = "none" : mask.style.display = "block";
    };
    _GM_registerMenuCommand("设置ttBlock", function() {
      insert ? toggleSetting(false) : document.body.appendChild(shadowDOM);
      setInitialValue();
      insert = true;
    });
    document.body.addEventListener("click", function(e) {
      if (e.target && e.target.matches("#close_setting")) {
        toggleSetting();
      }
      if (e.target && e.target.matches("#save")) {
        submit();
      }
    });
  }
  function removeAds() {
    const adsCls = [".TopstoryItem--advertCard"];
    adsCls.forEach((cls) => {
      document.querySelectorAll(cls).forEach((dom) => dom.remove());
    });
  }
  function removeVideo() {
    const video = document.querySelectorAll(".ZVideoItem-video");
    video.forEach((v) => {
      var _a;
      (_a = v.closest(".TopstoryItem-isRecommend")) == null ? void 0 : _a.remove();
    });
  }
  function removeSide$1() {
    const siderbar = document.querySelector(
      '[data-za-detail-view-path-module="RightSideBar"]'
    );
    const content = document.querySelector(".Topstory-mainColumn");
    siderbar == null ? void 0 : siderbar.remove();
    if (content) {
      content.style.width = "100%";
    }
  }
  function removeKfe() {
    const video = document.querySelectorAll(
      ".KfeCollection-PcCollegeCard-wrapper"
    );
    video.forEach((v) => {
      var _a;
      (_a = v.closest(".SearchResult-Card")) == null ? void 0 : _a.remove();
    });
  }
  function removeSide() {
    const content = document.querySelector("#SearchMain");
    const siderbar = content == null ? void 0 : content.nextElementSibling;
    siderbar == null ? void 0 : siderbar.remove();
    if (content) {
      content.style.width = "100%";
    }
  }
  registerSetting();
  async function init() {
    const values = await get_values();
    if (values["home-side"] === "1") removeSide$1();
    if (values["home-video"] === "1") removeVideo();
    if (values["home-ads"] === "1") removeAds();
    if (values["search-side"] === "1") removeSide();
    if (values["search-kfe"] === "1") removeKfe();
  }
  const observer = new MutationObserver(function() {
    init();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  init();

})();