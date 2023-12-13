import { run } from "./post-output.mjs";

if (process.argv.length < 5) {
    console.error("Usage: node run-day.js <submit> <year> <day>");
    process.exit(1);
}

const submit = process.argv[2];
const year = process.argv[3];
const day = process.argv[4];
const level = process.argv[5];

try {
    console.log(`Running solution for ${year}/${day} part ${level}:`);
    const module = await import(`../${year}/${day}/index.mjs`);
    let answer;
    if (level === "1") {
        console.time("solve");
        answer = module.solve1();
        console.log("Your answer:", answer);
        console.timeEnd("solve");
    }

    if (level === "2") {
        console.time("solve");
        answer = module.solve2();
        console.log("Your answer:", answer);
        console.timeEnd("solve");
    }

    if (submit === "submit" && answer) {
        await run({ year, day, level, answer });
    }
} catch (error) {
    console.error(`Error running command:`, error);
    process.exit(1);
}
