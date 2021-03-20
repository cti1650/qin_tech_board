function keywordConv(str) {
  let rep = str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .toLowerCase();
  return rep;
}

Vue.component("GrayButton", {
  props: ["url", "summary", "title"],
  template: `
      <a :href="url" target="_blank" rel="noopener noreferrer">
      <div class="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-2 py-1 shadow-lg text-white hover:text-black">
      <div class="text-xs text-gray-500">{{ summary  || '' }}</div><div class="text-xl">{{ title }}</div>
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
  props: ["items", "keyword"],
  template: `
      <ul class="flex flex-row flex-wrap">
      <div class="w-full sm:w-1/2 lg:w-1/4 p-1" v-for="item in items" v-if="!keyword || ~keywordConv((item['ツール名'] + item['分類'])).indexOf(keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['ツール名']" :summary="item['分類']" />
      </ButtonItem>
      </div>
      </ul>
      `,
});

Vue.component("ArticlesButtons", {
  props: ["items", "keyword"],
  template: `
      <ul class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2 p-1" v-for="item in items" v-if="!keyword || ~keywordConv(item['ツール名'] + item['分類']).indexOf(keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['ツール名']" :summary="item['分類']">
      </ButtonItem>
      <div>
      </ul>
      `,
});

Vue.component("FormAddButtons", {
  props: ["items", "keyword"],
  template: `
      <ul class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2 p-1" v-for="item in items" v-if="!keyword || ~keywordConv(item['名称'] + item['分類']).indexOf(keyword)">
      <ButtonItem :item="item">
        <GrayButton :url="item['URL']" :title="item['名称']" :summary="item['分類']">
      </ButtonItem>
      <div>
      </ul>
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

Vue.component("tool", {
  data: function () {
    return {
      items: [],
      keyword: "",
    };
  },
  mounted: function () {
    this.load();
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
  <div class="w-full px-4 mt-4">
  <input type="search" class="w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white" placeholder="検索" v-on:keyup="doSearch"></input>
  </div>
  <ListTitle title="ツール＆サービス" />
  <LinkButtons :items="items.data['ツール＆サービス']" :keyword="keyword"></LinkButtons>
  <ListTitle title="npm module" />
  <LinkButtons :items="items.data['node.jsモジュール']" :keyword="keyword"></LinkButtons>
  <ListTitle title="記事" />
  <ArticlesButtons :items="items.data['参考記事']" :keyword="keyword"></ArticlesButtons>
  <ListTitle title="Qin-Design共有シート" />
  <LinkButtons :items="items.data['Qin-Design共有シート']" :keyword="keyword"></LinkButtons>
  <ListTitle title="フォーム受付" />
  <FormAddButtons :items="items.data['フォーム受付']" :keyword="keyword"></FormAddButtons>
  <ListTitle title="受付フォーム" />
  <div class="w-full text-white text-sm">フォームで追加された内容はおおよそ10分後に反映されますのでしばらくお待ちください！</div>
  <GoogleForm />
  </div>
  `,
});
