Vue.component("LinkButtons", {
  props: ["items"],
  template: `
      <ul class="flex flex-row flex-wrap">
      <div class="w-full sm:w-1/2 lg:w-1/4 p-1" v-for="item in items">
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
      <li class="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg border border-gray-600 px-2 py-1 shadow-lg text-white hover:text-black">
      <div class="text-xs text-gray-500">{{ item.summary }}</div><div class="text-xl">{{ item.name }}</div>
      </li>
      </a>
      <div>
      </ul>
      `,
});

Vue.component("ArticlesButtons", {
  props: ["items"],
  template: `
      <ul class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2 p-1" v-for="item in items">
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
      <li class="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg border border-gray-600 px-2 py-1 shadow-lg text-white hover:text-black">
      <div class="text-xs text-gray-500">{{ item.summary }}</div><div class="text-xl">{{ item.name }}</div>
      </li>
      </a>
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

Vue.component("tool", {
  data: function () {
    return {
      items: [],
    };
  },
  mounted: function () {
    this.load();
  },
  methods: {
    load: function () {
      var self = this;
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbw-FHf7In9FfwHy9ZjWcpU5kRz6KskqkUiK6I6FYW6ACV67llxoHiv6C_kYwFAcal-g/exec"
        )
        .then(function (res) {
          console.log(res);
          self.items = res.data;
        });
    },
  },
  template: `
  <div>
  <ListTitle title="ツール＆サービス" />
  <LinkButtons :items="items.tools"></LinkButtons>
  <ListTitle title="npm module" />
  <LinkButtons :items="items.modules"></LinkButtons>
  <ListTitle title="記事" />
  <ArticlesButtons :items="items.articles"></ArticlesButtons>
  </div>
  `,
});
