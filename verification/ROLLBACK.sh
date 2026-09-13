#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const target = process.argv[2];
if (!target) {
  console.error("usage: ROLLBACK.sh TARGET_FILE");
  process.exit(2);
}
const source = path.join(__dirname, "BASELINE_FILE");
fs.copyFileSync(source, target);
console.log(`rollback restored ${target} from ${source}`);
