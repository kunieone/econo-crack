eval(
  (function (p, a, c, k, e, r) {
    e = function (c) {
      return (
        (c < 62 ? "" : e(parseInt(c / 62))) +
        ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if ("0".replace(0, e) == 0) {
      while (c--) r[e(c)] = k[c];
      k = [
        function (e) {
          return r[e] || e;
        },
      ];
      e = function () {
        return "([46-9a-df-hj-oq-tv-zA-Z]|1\\w)";
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
  })(
    '$(t(){t k(9){6 8="";v(6 4=0;4<9.l;4++){Q(9[4].R){m"f":8+=9[4].7;d;m"S":6 w="";Object.keys(9[4].g).x(t(y){w+=" "+y+\'="\'+9[4].g[y]+\'"\'});8+="<"+9[4].h+w+">"+k(9[4].b)+"</"+9[4].h+">";d;T:8+="<u>"+z.stringify(9[4])+"</u>";d}}return 8}const U=[".layout-sticky-V-W-wrapper","#tp-A","#AdBillboard","#B-C-D-right-V-r0","#B-C-D-A","#B-C-D-A",".newsletter-signup","#_evidon_banner",];6 E=10;6 F=5;6 G=n;o.q("删除广告中");6 X=Y(()=>{U.x((H)=>{c($(H)){document.querySelectorAll(".W").x((e)=>e.I());$(H).I();F--;G=Z}});E--;c(F==0||E==0||G==n){11(X);o.q("删除广告完成")}},500);6 r="#J p.K-f";6 s=$("#__NEXT_DATA__");6 L="#new-article-template > a > a:M-N(1) > a:M-N(3) > a section > a:M-N(1)";6 12=Y(()=>{c($(r).l<=2){$(r)?$(r).I():0;c(s.l){o.q({"测试是否有内容:":z.13(s[0].14).15.16.J[0].f,});6 7=z.13(s[0].14).15.16.J[0].f;6 j=n;6 8="";v(6 i=0;i<7.l;i++){c(7[i].R=="S"){Q(7[i].h){m"p":8+=\'<p 17="K-f">\'+k(7[i].b)+"</p>";d;m"O":c(7[i].g.itemtype=="https://schema.org/ImageObject"){v(6 4=0;4<7[i].b.l;4++){c(7[i].b[4].h=="18"){c(j){8+="</a>";j=n}8+=\'<a 17="K-f-image"><O><a><18 19="\'+7[i].b[4].g.19+\'"style="/*1a:\'+7[i].b[4].g.1a+"px;1c:"+7[i].b[4].g.1c+\'px*/"\'+"></a></O>";j=Z}}}d;m"P":8+="<P>"+k(7[i].b)+"</P>";d;T:8+="<"+7[i].h+">"+k(7[i].b)+"</"+7[i].h+">>";d}}}c(j){8+="</a>";j=n}o.q("父节点",$(L));$(L).append(8)}11(12)}},1000)});',
    [],
    75,
    "||||ii||let|data|contentParagraph|jsonData|div|children|if|break||text|attribs|name||figureFlag|addContent|length|case|false|console||log|postQuery|nextData|function||for|attr|forEach|key|JSON|regwall|gpt|ad|slot|counter|repeatTime|flag|item|remove|content|article__body|contentParent|nth|child|figure|h2|switch|type|tag|default|adss|rail|advert|timer1|setInterval|true||clearInterval|addContentTimer|parse|textContent|props|pageProps|class|img|src|height||width".split(
      "|",
    ),
    0,
    {},
  ),
);
