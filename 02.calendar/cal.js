#!/usr/bin/env node

import minimist from "minimist";
import * as dateFns from "date-fns";
import * as dateFnsTz from "@date-fns/tz";

const args = minimist(process.argv.slice(2));

const calYear = args.y || today.getFullYear();
let calMonth = today.getMonth();
if (args.m) {
  calMonth = args.m - 1;
}
const today = dateFnsTz.TZDate.tz("Asia/Tokyo");

const calDate = new dateFnsTz.TZDate(calYear, calMonth - 1, "Asia/Tokyo");

const firstDate = dateFns.startOfMonth(calDate);
const lastDate = dateFns.endOfMonth(calDate);

const blankArray = [];
const datesArray = [];
const calendarRows = [];
const calendarColNumber = 7;

for (let x = 0; x < firstDate.getDay(); x++) {
  blankArray.push("   ");
}

for (let y = firstDate.getDate(); y <= lastDate.getDate(); y++) {
  datesArray.push(y.toString().padStart(3, " "));
}

const calendarDates = blankArray.concat(datesArray);

for (let z = 0; z < calendarDates.length; z += calendarColNumber) {
  calendarRows.push(calendarDates.slice(z, z + calendarColNumber));
}

console.log(`       ${calMonth}月 ${calYear}   `);
console.log(" 日 月 火 水 木 金 土");
for (const calendarRow of calendarRows) {
  console.log(calendarRow.join(""));
}
