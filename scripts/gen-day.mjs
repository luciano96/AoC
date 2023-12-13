import { execSync } from "child_process";
if (process.argv.length < 4) {
    console.error("Usage: node gen-day.js <year> <day>");
    process.exit(1);
}

const year = process.argv[2];
const day = process.argv.slice(3).join(" ");

console.log("=> generating code")
execSync(
    `pnpm hygen day-challenge new --force --year=${year} --day=${day}`,
    {
        stdio: "inherit",
        stderr: "inherit",
    }
    );
console.log("=> done")
    
try {
    execSync(`node ./scripts/download-input.mjs ${year} ${day}`, {
        stdio: "inherit",
        stderr: "inherit",
    });
} catch (error) {
    console.error(`Error fetching input`, error.stderr);
}

try {
    execSync(`pnpm -C ./${year}/${day} install`, {
        stdio: "inherit",
        stderr: "inherit",
    });
} catch (error) {
    console.error(`Error fetching input`, error.stderr);
}

process.exit(0);
