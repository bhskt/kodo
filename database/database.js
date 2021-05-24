import { promises as fs } from "fs";

export default class Database {
  constructor({ file }) {
    this.file = file;
  }

  async init() {
    this.raw = await fs.readFile(this.file);
    this.posts = JSON.parse(this.raw);
  }
}
