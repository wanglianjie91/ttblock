// 广告
export function removeAds() {
  const adsCls = [".TopstoryItem--advertCard"];
  adsCls.forEach((cls) => {
    document.querySelectorAll(cls).forEach((dom) => dom.remove());
  });
}
// 去视频
export function removeVideo() {
  const video = document.querySelectorAll(".ZVideoItem-video");
  video.forEach((v) => {
    v.closest(".TopstoryItem-isRecommend")?.remove();
  });
}
// 去侧边栏
export function removeSide() {
  const siderbar = document.querySelector(
    '[data-za-detail-view-path-module="RightSideBar"]'
  );
  const content = document.querySelector(".Topstory-mainColumn");
  siderbar?.remove();
  if (content) {
    (content as HTMLElement).style.width = "100%";
  }
}
