import { query, trim } from "./utils";

// 历史记录
class History {
  dbKey = "GM_ZH_HISTORY";
  init() {
    this.addNav();
    this.network();
  }
  addNav() {
    const nav = document.querySelector(".Topstory-tabs");
    const topstory = ["/", "/follow", "/hot", "/zvideo"];
    const { pathname } = window.location;

    const range = document.createRange();
    const link = range.createContextualFragment(`
    <a id="history" tabindex="0" aria-controls="Topstory-history" class="TopstoryTabs-link Topstory-tabsLink" data-za-detail-view-id="9122" href="/">
      历史记录
    </a>`);
    // 插入导航
    if (topstory.includes(pathname)) {
      // 插入导航
      nav?.appendChild(link);
      // 绑定事件
      document.body.addEventListener("click", (e) => {
        if (e.target && (e.target as Element).matches!("#history")) {
          this.open();
          e.preventDefault();
        }
      });
    }
  }
  open() {}
  network() {
    monkeyWindow.middleMan.addHook(
      /^https:\/\/www\.zhihu\.com\/api\/v4\/(answers|articles)\/.*\/relationship\?desktop=true$/,
      {
        async responseHandler({ url }: { url: string }) {
          const answerRex =
            /https:\/\/www\.zhihu\.com\/api\/v4\/answers\/(\d+)\/relationship\?desktop=true/;
          const articleRex =
            /https:\/\/www\.zhihu\.com\/api\/v4\/articles\/(\d+)\/relationship\?desktop=true/;

          const answerMatch = url.match(answerRex);
          const articleMatch = url.match(articleRex);

          let type = 0,
            id = "0",
            address = "";

          if (answerMatch) {
            id = answerMatch[1];
            type = 1;
            address = `https://www.zhihu.com/api/v4/answers/3509868646`;
          }
          if (articleMatch) {
            id = articleMatch[1];
            type = 2;
            address = `https://www.zhihu.com/api/v4/articles/${id}`;
          }
          console.log(address);
          if (type === 0) return;

          GM_xmlhttpRequest({
            method: "GET",
            url: address,
            headers: {
              // 需要逆向出header参数 todo
            },
            onload: function (response) {
              console.log(response);
              if (
                response.readyState === 4 &&
                response.status >= 200 &&
                response.status <= 400
              ) {
                // todo
              }
              console.log(response.responseText);
            },
          });
        },
      }
    );
  }
  async getHistory(offset = 0) {
    const his = await GM.getValue(this.dbKey, []);
    return his.slice(offset, 10);
  }
}
export const history = new History();

// 广告
export function removeAds() {
  const adsCls = [".TopstoryItem--advertCard"];
  adsCls.forEach((cls) => {
    document.querySelectorAll(cls).forEach((dom) => dom.remove());
  });
}
// 视频
export function removeVideo() {
  const video = document.querySelectorAll(".ZVideoItem-video");
  video.forEach((v) => {
    v.closest(".TopstoryItem-isRecommend")?.remove();
  });
}
// 侧边栏
export function removeSide() {
  const siderbar = document.querySelector(
    '[data-za-detail-view-path-module="RightSideBar"]'
  );
  const content = document.querySelector(".Topstory-mainColumn");
  setTimeout(() => {
    siderbar?.remove();
  }, 300);
  if (content) {
    (content as HTMLElement).style.width = "100%";
  }
}
