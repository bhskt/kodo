import MockDatabase from "../../database/database.mock.js";
import PostsService from "../../services/posts.js";

const database = new MockDatabase();

describe("PostsService", () => {
  test("constructor", () => {
    const postsService = new PostsService({ database });

    expect(postsService instanceof PostsService).toBe(true);
  });

  test("total", () => {
    const postsService = new PostsService({ database });

    expect(postsService.total).toBe(3);
  });

  test("search default params", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "",
      sort: "title",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(3);
    expect(output.total).toBe(3);
  });

  test("search no params", () => {
    const postsService = new PostsService({ database });

    try {
      postsService.search();
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  test("search empty params", () => {
    const postsService = new PostsService({ database });

    try {
      postsService.search({});
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  test("search query no result", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "abcdefghijklmnopqrstuvwxyz",
      sort: "title",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(0);
    expect(output.total).toBe(0);
  });

  test("search query non exact phrase", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "Designer Test",
      sort: "title",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(2);
    expect(output.total).toBe(2);
  });

  test("search query non exact phrase with offset", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "Designer Test",
      sort: "title",
      offset: 1,
      limit: 10,
    });

    expect(output.posts.length).toBe(1);
    expect(output.posts[0].title).toBe("Dynamic Infrastructure Designer Test");
    expect(output.total).toBe(2);
  });

  test("search query non exact phrase with limit", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "Designer Test",
      sort: "title",
      offset: 0,
      limit: 1,
    });

    expect(output.posts.length).toBe(1);
    expect(output.posts[0].title).toBe(
      "Customer Assurance Designer Liaison Test"
    );
    expect(output.total).toBe(2);
  });

  test("search query exact phrase", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: '"Designer Test"',
      sort: "title",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(1);
    expect(output.total).toBe(1);
  });

  test("search query with sort title", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "",
      sort: "title",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(3);
    expect(output.posts[0].title).toBe("A Regional Configuration Designer");
    expect(output.total).toBe(3);
  });

  test("search query with sort dateLastEdited", () => {
    const postsService = new PostsService({ database });
    const output = postsService.search({
      query: "",
      sort: "dateLastEdited",
      offset: 0,
      limit: 10,
    });

    expect(output.posts.length).toBe(3);
    expect(output.posts[0].title).toBe("Dynamic Infrastructure Designer Test");
    expect(output.total).toBe(3);
  });
});
