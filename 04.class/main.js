#!/usr/bin/env node

import { MemoApp } from "./memo_app.js";

const args = process.argv.slice(2);

const memoApp = await MemoApp.create();
await memoApp.run(args);
await memoApp.close();
