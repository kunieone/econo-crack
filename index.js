// ==UserScript==
// @name         「永久更新」🐹economist经济学人免费看，全部解锁，并移出了广告
// @namespace    economist_hack
// @version      0.9.1
// @description  经济学人解锁所有完整内容！如果出现新的广告的情况，可以给我发邮件提醒我更新！email: kunieone@163.com 也可以在b站上关注我 @star_evan https://space.bilibili.com/1709786818 感谢大家的使用，如果感觉这个插件有用的话，可以点一个小小的赞哦👍
// @author       https://github.com/kunieone
// @match        https://*.economist.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// @license      MIT
// @esversion    6
// ==/UserScript==

// methods
function addContent(jsonData) {
  let contentParagraph = "";
  for (let ii = 0; ii < jsonData.length; ii++) {
    switch (jsonData[ii].type) {
      case "text":
        contentParagraph += jsonData[ii].data;
        break;
      case "tag":
        let attr = "";
        Object.keys(jsonData[ii].attribs).forEach(function (key) {
          attr += " " + key + '="' + jsonData[ii].attribs[key] + '"';
        });
        contentParagraph +=
          "<" +
          jsonData[ii].name +
          attr +
          ">" +
          addContent(jsonData[ii].children) +
          "</" +
          jsonData[ii].name +
          ">";
        break;
      default:
        contentParagraph += "<u>" + JSON.stringify(jsonData[ii]) + "</u>";
        break;
    }
  }
  return contentParagraph;
}

// main
$(function () {
  // 禁止访问该域名：

  (function blocker() {
    "use strict";

    // Override XMLHttpRequest to block requests to pips.taboola.com
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      const instance = new originalXHR();
      instance.open = function () {
        arguments[1] = arguments[1].replace(
          /pips\.taboola\.com/g,
          "blocked.pips.taboola.com"
        );
        originalXHR.prototype.open.apply(this, arguments);
      };
      return instance;
    };
  })();

  (function cleaner() {
    // 选择器列表
    const advertisementGroup = [
      ".layout-sticky-rail-advert-wrapper",
      "#AdBillboard",
      "#gpt-ad-slot-right-rail-r0",
      "#gpt-ad-slot-regwall",
      "#gpt-ad-slot-regwall",
      ".newsletter-signup",
      "#_evidon_banner",
      `[class^="adComp"]`, // 新添加一个banner广告的屏蔽
      // adComponent_advert
      `div[class*="adComponent_advert"]`, //20230826
      `div[class*="adComponent"]`, //20230826
      `div[class*="expandable-banner"]`,
      "[ng-show]",
    ];

    console.log("删除广告中");
    let repeatTime = 5; // 重复扫描次数
    let counter = 30; // 总的扫描次数
    let intervalTime = 1000; // 初始定时间隔为1秒
    let flag = false; // 标志是否删除过广告

    const removeAds = () => {
      advertisementGroup.forEach((item) => {
        if ($(item).length) {
          document.querySelectorAll(".advert").forEach((e) => e.remove());
          $(item).remove();
          repeatTime--;
          flag = true;
        }
      });

      counter--;

      if (repeatTime <= 0 || counter <= 0 || flag === false) {
        clearInterval(timer);
        console.log("删除广告完成");
      }

      if (counter === 25) {
        intervalTime = 7000; // 5秒后，扫描间隔变为7秒
      }
    };

    // 初始执行，前5秒每秒执行一次
    const timer = setInterval(removeAds, intervalTime);

    // 进入「突击阶段」，每30秒重新扫描，重复5次
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(removeAds, i * 30000); // 每隔30秒执行一次
      }
    }, 30000);
  })();

  (function cracker() {
    "use strict";

    // Define the function to call when the element is found
    function crackArticle() {
      // Implement your logic here
      console.log("#{debugdebug} Element found! Calling crackArticle...");

      //选取文章元素
      let postQuery = "#content p.article__body-text";
      //选取文章内容Json
      let nextData = $("#__NEXT_DATA__");
      let contentParent =
        // "#new-article-template > div > div:nth-child(1) > div:nth-child(3) > div section > div:nth-child(1)";
        "[data-body-id]>div";
      let addContentTimer = setInterval(() => {
        if ($(postQuery).length <= 2) {
          $(postQuery) ? $(postQuery).remove() : 0;
          $("[data-body-id]>div>div:nth-child(0)").remove();
          $("[data-body-id]>div>div:nth-child(1)").remove();
          // 受限制模式下展示的部分文章也要删除
          $(".layout-article-regwall").remove();
          //重新填充内容
          if (nextData.length) {
            try {
              const rawData = JSON.parse(nextData[0].textContent);
              const contentData = rawData?.props?.pageProps?.content?.text;
              // console.log(`contentData----${JSON.stringify(contentData)}`);
              if (Array.isArray(contentData)) {
                let figureFlag = false;
                let contentParagraph = "";

                for (const item of contentData) {
                  if (item.type === "tag") {
                    switch (item.name) {
                      case "p":
                        contentParagraph +=
                          '<p class="article__body-text">' +
                          addContent(item.children) +
                          "</p>";
                        break;
                      case "figure":
                        if (
                          item.attribs?.itemtype ===
                          "https://schema.org/ImageObject"
                        ) {
                          for (const childItem of item.children) {
                            if (childItem.name === "img") {
                              if (figureFlag) {
                                contentParagraph += "</div>";
                                figureFlag = false;
                              }
                              contentParagraph +=
                                '<div class="article__body-text-image"><figure><div><img src="' +
                                childItem.attribs.src +
                                '"></div></figure>';
                              figureFlag = true;
                            }
                          }
                        }
                        break;
                      case "h2":
                        contentParagraph +=
                          "<h2>" + addContent(item.children) + "</h2>";
                        break;
                      default:
                        contentParagraph +=
                          "<" +
                          item.name +
                          ">" +
                          addContent(item.children) +
                          "</" +
                          item.name +
                          ">";
                        break;
                    }
                  }
                }

                if (figureFlag) {
                  contentParagraph += "</div>";
                }

                $(contentParent).append(contentParagraph);
              } else {
                console.log("Content data is not an array.");
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }

          clearInterval(addContentTimer);
          // console.log("脚本运行完毕")
        }
      }, 300);
    }

    let found = false;
    let interval = setInterval(() => {
      const element = document.querySelector("#tp-regwall");
      if (element) {
        console.log(`找到了`);
        found = true;
        setTimeout(() => {
          crackArticle();
        }, 0);
        clearInterval(interval);
      } else {
        console.log(`没找到！`);
      }
    }, 10); // Check every 1 second

    setTimeout(() => {
      if (!found) {
        clearInterval(interval); // Clear the interval if the element was not found
        console.warn("#{debugdebug} Element not found within 30 seconds.");
      }
    }, 30000); // Stop checking after 30 seconds
  })();
});
