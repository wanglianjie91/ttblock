// 去盐选
export function removeKfe() {
  const video = document.querySelectorAll(
    ".KfeCollection-PcCollegeCard-wrapper"
  );
  video.forEach((v) => {
    v.closest(".SearchResult-Card")?.remove();
  });
}

// 去侧边栏
export function removeSide() {
  const content = document.querySelector("#SearchMain");
  const siderbar = content?.nextElementSibling;
  siderbar?.remove();
  if (content) {
    (content as HTMLElement).style.width = "100%";
  }
}
