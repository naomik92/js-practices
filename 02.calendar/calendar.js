#!/usr/bin/env node

import minimist from "minimist";
import { startOfMonth, endOfMonth } from "date-fns";
import { TZDate } from "@date-fns/tz";

const args = minimist(process.argv.slice(2));

const today = TZDate.tz("Asia/Tokyo");
const cal_year = args.y || today.getFullYear();
const cal_month = args.m - 1 || today.getMonth();

const cal_date = new TZDate(cal_year, cal_month, "Asia/Tokyo");

const first_date = startOfMonth(cal_date).getDate();
const last_date = endOfMonth(cal_date).getDate();
const first_day = startOfMonth(cal_date).getDay();

const blank_array = [];
const dates_array = [];
const calendar_rows = [];
const calendar_col_number = 7;

for (let x = 0; x < first_day; x++) {
  blank_array.push("   ");
}

for (let y = first_date; y <= last_date; y++) {
  dates_array.push(y.toString().padStart(3, " "));
}

const calendar_dates = blank_array.concat(dates_array);

for (let z = 0; z < calendar_dates.length; z += calendar_col_number) {
  calendar_rows.push(calendar_dates.slice(z, z + calendar_col_number));
}

console.log(`       ${cal_month + 1}月 ${cal_year}   `);
console.log(" 日 月 火 水 木 金 土");
for (const calendar_row of calendar_rows) {
  console.log(calendar_row.join(""));
}
