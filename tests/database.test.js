import PACKAGE from "../package.json";

import Database from "../database/database.js";

describe("Database", () => {
  test("constructor", () => {
    const database = new Database({
      file: PACKAGE.testConfig.database.filePath,
    });

    expect(database instanceof Database).toBe(true);
  });

  test("init with existing file", async () => {
    const database = new Database({
      file: PACKAGE.testConfig.database.filePath,
    });

    await expect(database.init()).resolves.toBe(undefined);
    expect(database.posts.length).toBe(3);
  });

  test("init with non-existing file", async () => {
    const database = new Database({
      file: "does.not.exist",
    });

    await expect(database.init()).rejects.toThrow();
  });

  test("init with bad file", async () => {
    const database = new Database({
      file: "app.js",
    });

    await expect(database.init()).rejects.toThrow();
  });
});
