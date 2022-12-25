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

$(function () {
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

  const adss = [
    ".layout-sticky-rail-advert-wrapper",
    "#tp-regwall",
    "#AdBillboard",
    "#gpt-ad-slot-right-rail-r0",
    "#gpt-ad-slot-regwall",
    "#gpt-ad-slot-regwall",
    ".newsletter-signup",
    "#_evidon_banner",
    `[class^="adComp"]`, // 新添加一个banner广告的屏蔽
  ];
  let counter = 10;
  let repeatTime = 5;
  let flag = false;
  console.log("删除广告中");
  let timer1 = setInterval(() => {
    adss.forEach((item) => {
      if ($(item)) {
        document.querySelectorAll(".advert").forEach((e) => e.remove()); //删除广告
        $(item).remove();
        repeatTime--;
        flag = true;
      }
    });
    counter--;
    if (repeatTime == 0 || counter == 0 || flag == false) {
      clearInterval(timer1);
      console.log("删除广告完成");
    }
  }, 500);

  //选取文章元素
  let postQuery = "#content p.article__body-text";
  //选取文章内容Json
  let nextData = $("#__NEXT_DATA__");
  let contentParent =
    "#new-article-template > div > div:nth-child(1) > div:nth-child(3) > div section > div:nth-child(1)";
  let addContentTimer = setInterval(() => {
    if ($(postQuery).length <= 2) {
      $(postQuery) ? $(postQuery).remove() : 0;

      //重新填充内容
      if (nextData.length) {
        //找出文章内容   ---这里修改好了
        console.log({
          "测试是否有内容:": JSON.parse(nextData[0].textContent).props.pageProps
            .content.text,
        });
        let data = JSON.parse(nextData[0].textContent).props.pageProps.content
          .text;
        let figureFlag = false;
        let contentParagraph = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == "tag") {
            switch (data[i].name) {
              case "p":
                contentParagraph +=
                  '<p class="article__body-text">' +
                  addContent(data[i].children) +
                  "</p>";
                break;
              case "figure":
                if (
                  data[i].attribs.itemtype == "https://schema.org/ImageObject"
                ) {
                  for (let ii = 0; ii < data[i].children.length; ii++) {
                    if (data[i].children[ii].name == "img") {
                      if (figureFlag) {
                        contentParagraph += "</div>";
                        figureFlag = false;
                      }
                      contentParagraph +=
                        '<div class="article__body-text-image"><figure><div><img src="' +
                        data[i].children[ii].attribs.src +
                        '"' +
                        'style="/*height:' +
                        data[i].children[ii].attribs.height +
                        "px;width:" +
                        data[i].children[ii].attribs.width +
                        'px*/"' +
                        "></div></figure>";
                      figureFlag = true;
                    }
                  }
                }
                break;
              case "h2":
                contentParagraph +=
                  "<h2>" + addContent(data[i].children) + "</h2>";
                break;
              default:
                contentParagraph +=
                  "<" +
                  data[i].name +
                  ">" +
                  addContent(data[i].children) +
                  "</" +
                  data[i].name +
                  ">" +
                  ">";
                break;
            }
          }
        }
        if (figureFlag) {
          contentParagraph += "</div>";
          figureFlag = false;
        }
        console.log("父节点", $(contentParent));
        $(contentParent).append(contentParagraph);
      }
      clearInterval(addContentTimer);
      // console.log("脚本运行完毕")
    }
  }, 1000);
});
