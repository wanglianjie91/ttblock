// 历史记录
export const history = {
  // 初始化
  init: function () {
    this.addNav();
    this.network();
  },
  // 添加导航
  addNav: function () {
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
  },
  open: function () {
    // const
  },
  network() {
    monkeyWindow.middleMan.addHook(
      "https://www.zhihu.com/api/v4/answers/*/relationship?desktop=true",
      {
        async requestHandler({ url }: { url: string }) {
          console.log(url);
        },
      }
    );
  },
};

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
