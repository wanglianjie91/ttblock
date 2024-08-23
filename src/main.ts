// 设置页面
import registerSetting, { get_values } from "./setting";
// 首页推荐广告
import * as home from "./home";
// 侧边栏
import * as search from "./search";

const values = await get_values();

async function observe() {
  const observer = new MutationObserver(function () {
    if (values["home-side"] === "1") home.removeSide();
    if (values["home-video"] === "1") home.removeVideo();
    if (values["home-ads"] === "1") home.removeAds();
    if (values["search-side"] === "1") search.removeSide();
    if (values["search-kfe"] === "1") search.removeKfe();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

async function init() {
  observe();
  registerSetting();
  if (values["home-history"] === "0") home.history.init();
}

init();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./worker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
