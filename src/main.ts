// 设置页面
import registerSetting, { get_values } from "./setting";
// 首页推荐广告
import * as home from "./home";
// 侧边栏
import * as search from "./search";

// 注册设置页面
registerSetting();

async function init() {
  const values = await get_values();
  if (values["home-side"] === "1") home.removeSide();
  if (values["home-video"] === "1") home.removeVideo();
  if (values["home-ads"] === "1") home.removeAds();
  if (values["search-side"] === "1") search.removeSide();
  if (values["search-kfe"] === "1") search.removeKfe();
}

const observer = new MutationObserver(function () {
  init();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

init();
