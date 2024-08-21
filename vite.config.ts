import { defineConfig } from "vite";
import monkey, { util } from "vite-plugin-monkey";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "ttblock",
        namespace: "npm/vite-plugin-monkey",
        // copyright: "",
        version: "0.0.1",
        description: "常用中文网站增强, 例如某乎等",
        // 低分辨率下的图标
        icon: "https://vitejs.dev/logo.svg",
        // iconURL: "",
        // defaulticon: "",
        // 64 * 64图标，同时存在时，icon将会在选项页面的某些位置缩放
        // icon64: "",
        // icon64URL: "",
        // 将可用函数列入白名单
        grant: ["GM.getValue", "GM.setValue", "GM.registerMenuCommand"],
        author: "tatoo",
        // homepage: "",
        // homepageURL: "",
        // 是否获利
        // antifeature: [
        //   {
        //     tag: "tag",
        //     type: "ads",
        //     description: "",
        //   },
        // ],
        // 脚本运行前加载 通过@require加载的脚本及其“use strict”语句可能会影响用户脚本的严格模式！
        // require: ["jquery", "dengdneg"],
        // preload 预加载可由脚本通过GM_getResourceURL和GM_getResourceText访问的资源。
        resource: {},
        // 不支持hash路由，支持正则
        include: ["*://www.zhihu.com/*"],
        // match: ["https://www.zhihu.com/*"],
        // exclude: [],
        "run-at": "document-idle",
        sandbox: "raw",
        // 该标签定义域（无顶级域），包括允许由GM_xmlhttpRequest检索的子域
        // connect: "self",
        // noframes: true,
        // 用户脚本的更新 URL。注意：需要@version标记才能进行更新检查。
        // updateURL: "",
        // 下载地址
        // downloadURL: "",
        // issue 地址
        // supportURL: "",
        //  拦截网络
        // webRequest: [
        //   {
        //     selector: {},
        //     action: {},
        //   },
        // ],
        // 将不带沙盒和包装器的脚本注入，这对于 Scriptlet 可能很有用。
        // unwrap: true,
      },
    }),
  ],
});
