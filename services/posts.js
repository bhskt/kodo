export default class PostsService {
  constructor({ database }) {
    this.posts = database.posts;
  }

  get total() {
    return this.posts.length;
  }

  search({ query, sort, offset, limit }) {
    const needles = [...query.toLowerCase().matchAll(/"((\w|\s)+)"|(\w+)/g)]
      .map((needle) => needle[1] || needle[3])
      .filter((needle) => !!needle);

    const posts = [...this.posts]
      .filter((post) => {
        const haystack = `${post.title} ${post.description}`.toLowerCase();

        for (const needle of needles) {
          if (!haystack.includes(needle)) return false;
        }

        return true;
      })
      .sort((postA, postB) => postA[sort].localeCompare(postB[sort]));

    return {
      posts: posts.slice(offset, offset + limit),
      total: posts.length,
    };
  }
}
