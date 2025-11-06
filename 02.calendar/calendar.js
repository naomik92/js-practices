#!/usr/bin/env node

import minimist from "minimist";
import { startOfMonth, endOfMonth } from "date-fns";
import { TZDate } from "@date-fns/tz";

const args = minimist(process.argv.slice(2));
// console.log(args);

const today = TZDate.tz("Asia/Tokyo");

const today_year = today.getFullYear();
const today_month = today.getMonth(); //月を取得
const first_date = startOfMonth(today).getDate(); //月の始まりを取得
const last_date = endOfMonth(today).getDate(); //月の終わりを取得
const first_day = startOfMonth(today).getDay(); //月の初日の曜日を取得

const blank_array = [];
const dates_array = []
const calendar_rows = [];
const calendar_col_number = 7;

for(let j = 0; j < first_day; j++) {
  blank_array.push("   ");
}

for(let i = first_date; i <= last_date; i++) {
  dates_array.push(i.toString().padStart(3, " "));
}

const calendar_dates = blank_array.concat(dates_array);

for(let k = 0; k < calendar_dates.length; k += calendar_col_number) {
  calendar_rows.push(calendar_dates.slice(k, k + calendar_col_number));
}

for(const calendar_row of calendar_rows) {
  console.log(calendar_row.join(""));
}
