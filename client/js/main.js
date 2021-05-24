async function main() {
  const LIMIT = 10;

  const app = new Vue({
    el: "#app",

    data: {
      page: 1,
      pages: 1,
      posts: [],
      query: "",
      sort: "title",
      total: 0,
    },

    mounted() {
      this.fetch();
    },

    methods: {
      async fetch() {
        const params = {
          query: this.query,
          sort: this.sort,
          offset: this.offset,
          limit: LIMIT,
        };

        const response = await fetch(
          `/api/posts/search?${new URLSearchParams(params)}`
        );
        const data = await response.json();

        this.posts = data.posts;
        this.total = data.total;

        this.pages = Math.ceil(this.total / LIMIT) || 1;
      },

      handlePage() {
        this.fetch();
      },

      handleSearch() {
        this.page = 1;

        this.fetch();
      },

      handleSort() {
        this.page = 1;

        this.fetch();
      },
    },

    computed: {
      offset() {
        return (this.page - 1) * LIMIT;
      },
    },
  });
}

main();
