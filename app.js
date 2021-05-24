import express from "express";
import morgan from "morgan";

import PACKAGE from "./package.json";

import Database from "./database/database.js";
import PostsController from "./controllers/posts.js";
import PostsService from "./services/posts.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function main() {
  const database = new Database({
    file: PACKAGE.config.database.filePath,
  });

  await database.init();

  const postService = new PostsService({ database });
  const postsController = new PostsController({ postService });

  app.use("/api/posts", postsController.router);
}

app.use("/", express.static("client"));

main();

export default app;
