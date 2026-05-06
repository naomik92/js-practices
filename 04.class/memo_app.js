#!/usr/bin/env node

import { Database } from "./database.js";

class MemoApp {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async addMemo() {
    await this.db.createData();
  }
}

const memoApp = new MemoApp();
await memoApp.addMemo();
