import express from "express";

const SORT = {
  title: "title",
  dateLastEdited: "dateLastEdited",
};

export default class PostsController {
  constructor({ postService }) {
    this.postService = postService;
    this.router = express.Router();

    this.router.get("/search", (request, response) => {
      const query = request.query.query?.trim() || "";
      const sort = SORT[request.query.sort?.trim()] || "title";
      const offset = +request.query.offset?.trim() || 0;
      const limit = +request.query.limit?.trim() || 10;

      response.json(postService.search({ query, sort, offset, limit }));
    });
  }
}
