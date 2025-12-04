#!/usr/bin/env node

import minimist from "minimist";
import * as dateFns from "date-fns";
import * as dateFnsTz from "@date-fns/tz";

const args = minimist(process.argv.slice(2));

const today = dateFnsTz.TZDate.tz("Asia/Tokyo");
const calYear = args.y ?? today.getFullYear();
const calMonth = args.m ?? today.getMonth() + 1;

const calDate = new dateFnsTz.TZDate(calYear, calMonth - 1, "Asia/Tokyo");

const firstDate = dateFns.startOfMonth(calDate);
const lastDate = dateFns.endOfMonth(calDate);

const calendarDates = [];
const calendarRows = [];
const calendarColNumber = 7;

for (let i = 0; i < firstDate.getDay(); i++) {
  calendarDates.push("   ");
}

for (let i = firstDate.getDate(); i <= lastDate.getDate(); i++) {
  calendarDates.push(i.toString().padStart(2, " ").padEnd(3, " "));
}

for (let i = 0; i < calendarDates.length; i += calendarColNumber) {
  calendarRows.push(calendarDates.slice(i, i + calendarColNumber));
}

console.log(`      ${calMonth}月 ${calYear}   `);
console.log("日 月 火 水 木 金 土");
for (const calendarRow of calendarRows) {
  console.log(calendarRow.join(""));
}
