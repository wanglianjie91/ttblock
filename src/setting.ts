const field_names = [
  "home-history",
  "home-side",
  "home-video",
  "home-ads",
  "search-side",
  "search-kfe",
] as const;

// 获取values
export const get_values = async function () {
  return {
    "home-history": await GM.getValue("home-history", "0"),
    "home-side": await GM.getValue("home-side", "0"),
    "home-video": await GM.getValue("home-video", "1"),
    "home-ads": await GM.getValue("home-ads", "1"),
    "search-side": await GM.getValue("search-side", "0"),
    "search-kfe": await GM.getValue("search-kfe", "1"),
  };
};

export default function () {
  let insert = false;
  const shadowDOM = document
    .createElement("div")
    .attachShadow({ mode: "open" });

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
                <label class="item-label">隐藏历史记录:</label>
                <div class="item-field">
                  <div class="field">
                    <label for="home-history-1">是</label>
                    <input
                      type="radio"
                      name="home-history"
                      id="home-history-1"
                      value="1"
                    />
                  </div>
                  <div class="field">
                    <label for="home-history-0">否</label>
                    <input
                      type="radio"
                      name="home-history"
                      id="home-history-0"
                      value="0"
                    />
                  </div>
                </div>
              </div>
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

  // 表单初始化
  const setInitialValue = async () => {
    const defaultValues = await get_values();
    field_names.forEach((name) => {
      const radios = document.getElementsByName(name);
      (radios as NodeListOf<HTMLInputElement>).forEach((radio) => {
        if (radio.value === defaultValues[name]) {
          radio.checked = true;
        }
      });
    });
  };

  // 提交表单
  const submit = async () => {
    field_names.forEach((name) => {
      const radios = document.getElementsByName(name);
      (radios as NodeListOf<HTMLInputElement>).forEach((radio) => {
        if (radio.checked) {
          GM_setValue(name, radio.value);
        }
      });
    });
    alert("设置已保存，刷新页面!");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // 显示隐藏设置页面
  const toggleSetting = function (hide = true) {
    const mask = document.getElementById("mask_setting");
    if (!mask) return;
    hide ? (mask.style.display = "none") : (mask.style.display = "block");
  };

  // 注册设置菜单项
  GM_registerMenuCommand("设置ttBlock", function () {
    insert ? toggleSetting(false) : document.body.appendChild(shadowDOM);
    setInitialValue();
    insert = true;
  });

  document.body.addEventListener("click", function (e) {
    // 关闭设置页面
    if (e.target && (e.target as Element).matches!("#close_setting")) {
      toggleSetting();
    }
    // 提交
    if (e.target && (e.target as Element).matches!("#save")) {
      submit();
    }
  });
}
