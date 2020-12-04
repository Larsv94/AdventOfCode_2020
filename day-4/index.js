import { promises as fs } from "fs";

const validationRules = {
  byr: (val) => Number(val) >= 1920 && Number(val) <= 2002,
  iyr: (val) => Number(val) >= 2010 && Number(val) <= 2020,
  eyr: (val) => Number(val) >= 2020 && Number(val) <= 2030,
  hgt: (val) =>
    (val.includes("in") &&
      Number(val.replace("in", "")) >= 59 &&
      Number(val.replace("in", "")) <= 76) ||
    (val.includes("cm") &&
      Number(val.replace("cm", "")) >= 150 &&
      Number(val.replace("cm", "")) <= 193),
  hcl: (val) => /#[0-9a-f]{6}/.test(val),
  ecl: (val) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
  pid: (val) => /^[0-9]{9}$/.test(val),
};

let input = await fs.readFile("./input.txt", "utf8");
const pasports = input
  .split("\n\n")
  .map((pasport) =>
    pasport
      .replaceAll("\n", " ")
      .split(" ")
      .map((val) => val.split(":"))
  )
  .map((pasport) => Object.fromEntries(pasport));

const correctPassports = pasports.filter(function (pasport) {
  const fields = Object.keys(pasport).length;
  if (fields === 7) {
    return !Boolean(pasport.cid);
  }
  return fields === 8;
});

console.log("Part one:", correctPassports.length); //170

const validPassports = correctPassports.filter((passport) =>
  Object.entries(validationRules).every(([field, validator]) =>
    validator(passport[field])
  )
);

console.log("Part two:", validPassports.length); //103
