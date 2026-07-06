#!/usr/bin/env node

import { MemoApp } from "./memo_app.js";

const args = process.argv.slice(2);

const memoApp = new MemoApp();
memoApp.run(args);
