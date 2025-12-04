#!/usr/bin/env node

import minimist from "minimist";
import { startOfMonth, endOfMonth } from "date-fns";
import { TZDate } from "@date-fns/tz";

const args = minimist(process.argv.slice(2));

const today = TZDate.tz("Asia/Tokyo");
const calYear = args.y || today.getFullYear();
let calMonth = today.getMonth();
if (args.m) {
  calMonth = args.m - 1;
}

const calDate = new TZDate(calYear, calMonth, "Asia/Tokyo");

const firstDate = startOfMonth(calDate).getDate();
const lastDate = endOfMonth(calDate).getDate();
const firstDay = startOfMonth(calDate).getDay();

const blankArray = [];
const datesArray = [];
const calendarRows = [];
const calendarColNumber = 7;

for (let x = 0; x < firstDay; x++) {
  blankArray.push("   ");
}

for (let y = firstDate; y <= lastDate; y++) {
  datesArray.push(y.toString().padStart(3, " "));
}

const calendarDates = blankArray.concat(datesArray);

for (let z = 0; z < calendarDates.length; z += calendarColNumber) {
  calendarRows.push(calendarDates.slice(z, z + calendarColNumber));
}

console.log(`       ${calMonth + 1}月 ${calYear}   `);
console.log(" 日 月 火 水 木 金 土");
for (const calendarRow of calendarRows) {
  console.log(calendarRow.join(""));
}
