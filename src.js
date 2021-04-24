function keywordConv(str) {
  let rep = str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .toLowerCase();
  return rep;
}

Vue.component("GrayButton", {
  props: ["url", "summary", "title", "comment", "tag"],
  methods: {
    tags: (tagStr) => {
      if (tagStr) {
        return tagStr
          .split(",")
          .map((item) => {
            if (~item.indexOf("#")) {
              return item.trim();
            } else {
              return "#" + item.trim();
            }
          })
          .join(" ");
      } else {
        return "";
      }
    },
  },
  template: `
      <a :href="url" target="_blank" rel="noopener noreferrer">
        <div class="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-2 py-1 shadow-lg text-white hover:text-black">
          <div class="text-xs text-gray-500">{{ summary  || '' }}</div>
          <div class="text-xl"><a :href="'https://www.google.com/search?q=' + title" class="text-sm h-full py-1 px-1" target="_blank" rel="noopener noreferrer"><i class="fa fa-search"></i></a> {{ title }}</div>
          <div class="text-xs text-gray-500 px-4">{{ comment  || '' }}</div>
          <div class="text-gray-500" style="font-size:6px;">{{ tags(tag)  || '' }}</div>
        </div>
      </a>
      `,
});

Vue.component("GreenButton", {
  props: ["url", "summary", "title"],
  template: `
      <a :href="url" target="_blank" rel="noopener noreferrer">
      <div class="h-full bg-green-800 hover:shadow-inner hover:bg-green-300 rounded-lg outline-none border border-green-600 px-2 py-1 shadow-lg text-white hover:text-black">
      <div class="text-xs text-green-500">{{ summary  || '' }}</div><div class="text-xl">{{ title }}</div>
      </div>
      </a>
      `,
});

Vue.component("ButtonItem", {
  props: ["item"],
  template: `
      <li class="h-full w-full">
      <slot />
      </li>
      `,
});

Vue.component("ButtonItem2", {
  props: ["item"],
  template: `
      <div class="bg-red-700"><div class="text-xs text-gray-500">{{ item.summary  || '' }}</div><div class="text-xl">{{ item.name }}</div></div>
      `,
});

Vue.component("LinkButtons", {
  props: ["items", "keyword", "title"],
  methods: {
    SearchItems: (lists, word) => {
      return lists.filter((item) => {
        let flg = -1;
        word.split(" ").forEach((keyitem) => {
          if (flg !== 0) {
            flg = ~keywordConv(JSON.stringify(item)).indexOf(keyitem);
          }
        });
        return !word || flg;
      });
    },
  },
  template: `
      <div v-if="SearchItems(items,keyword).length !== 0">
      <ListTitle :title="title" />
      <ul class="flex flex-row flex-wrap">
      <div class="w-full sm:w-1/2 lg:w-1/4 p-1" v-for="item in SearchItems(items,keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['ツール名']" :summary="item['分類']" :comment="item['備考']" :tag="item['タグ']" />
      </ButtonItem>
      </div>
      </ul>
      </div>
      `,
});

Vue.component("ArticlesButtons", {
  props: ["items", "keyword", "title"],
  methods: {
    SearchItems: (lists, word) => {
      return lists.filter((item) => {
        let flg = -1;
        word.split(" ").forEach((keyitem) => {
          if (flg !== 0) {
            flg = ~keywordConv(JSON.stringify(item)).indexOf(keyitem);
          }
        });
        return !word || flg;
      });
    },
  },
  template: `
      <div v-if="SearchItems(items,keyword).length !== 0">
      <ListTitle :title="title" />
      <ul class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2 p-1" v-for="item in SearchItems(items,keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['ツール名']" :summary="item['分類']" :comment="item['備考']">
      </ButtonItem>
      <div>
      </ul>
      </div>
      `,
});

Vue.component("FormAddButtons", {
  props: ["items", "keyword", "title"],
  methods: {
    SearchItems: (lists, word) => {
      return lists.filter((item) => {
        let flg = -1;
        word.split(" ").forEach((keyitem) => {
          if (flg !== 0) {
            flg = ~keywordConv(JSON.stringify(item)).indexOf(keyitem);
          }
        });
        return !word || flg;
      });
    },
  },
  template: `
      <div v-if="SearchItems(items,keyword).length !== 0">
      <ListTitle :title="title" />
      <ul class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2 p-1" v-for="item in SearchItems(items,keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['名称']" :summary="item['分類']" :comment="item['備考']">
      </ButtonItem>
      <div>
      </ul>
      </div>
      `,
});

Vue.component("ListTitle", {
  props: ["title"],
  template: `
      <div class="text-white mt-4 text-lg">{{title}}</div>
      `,
});

Vue.component("GoogleForm", {
  props: ["title"],
  template: `
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLScP5qjYvNSsm-AtHVm7uQOMXsrcvSoaRyJ9fuyJLF68fdqTNg/viewform?embedded=true"
    width="100%"
    height="1400px"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  >
    読み込んでいます…
  </iframe>
      `,
});

Vue.component("ScrollTop", {
  methods: {
    scrollTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  template: `
  <div
    class="fixed text-xl p-1 outline-none z-50 bg-gray-700 bg-opacity-50 text-center text-gray-400 rounded-full"
    style="right:0.5rem;bottom:0.5rem;width:2.5rem;height:2.5rem;line-none;cursor:pointer;"
    @click="scrollTop"
  >
    ▲
  </div>
  `,
});

Vue.component("tool", {
  data: function () {
    return {
      items: [],
      keyword: "",
    };
  },
  mounted: function () {
    this.load();
    setInterval(this.load, 1000 * 20);
  },
  methods: {
    load: function () {
      let self = this;
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec"
        )
        .then(function (res) {
          console.log(res);
          self.items = res.data;
        });
    },
    doSearch: function (e) {
      this.keyword = keywordConv(e.target.value);
    },
  },
  template: `
  <div>
  <div class="w-full sticky top-0 bg-black px-4 py-2 mt-4">
  <input type="search" class="w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white" placeholder="検索" v-on:keyup="doSearch"></input>
  </div>
  <LinkButtons title="ツール＆サービス" :items="items.data['ツール＆サービス']" :keyword="keyword"></LinkButtons>
  <LinkButtons title="npm module" :items="items.data['node.jsモジュール']" :keyword="keyword"></LinkButtons>
  <ArticlesButtons title="記事" :items="items.data['参考記事']" :keyword="keyword"></ArticlesButtons>
  <LinkButtons title="Qin-Design共有シート" :items="items.data['Qin-Design共有シート']" :keyword="keyword"></LinkButtons>
  <FormAddButtons title="フォーム受付" :items="items.data['フォーム受付']" :keyword="keyword"></FormAddButtons>
  <ListTitle title="受付フォーム" />
  <div class="w-full text-white text-sm">フォームで追加された内容はおおよそ10分後に反映されますのでしばらくお待ちください！</div>
  <GoogleForm />
  <ScrollTop />
  </div>
  `,
});
