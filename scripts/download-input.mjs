import "dotenv/config";
import { writeToFile } from "../utils.mjs";

const getInput = ({ year, day }) => {
    const actualDay = day.charAt(0) === '0' ? day.substring(1) : day
    

    fetch(`https://adventofcode.com/${year}/day/${actualDay}/input`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: `session=${process.env.session}`,
        },
    })
        .then((response) => response.text())
        .then((response) => {
            console.log("=> writing to file:", `${day}input.txt`);
            writeToFile(`${year}/${day}/input.txt`, response);
            console.log("=> done");
        });
};

export const run = () => {
    if (process.argv.length < 4) {
        console.error("Usage: node download-input.js <year> <day>");
        process.exit(1);
    }

    const year = process.argv[2];
    const day = process.argv[3];

    try {
        getInput({ year, day });
    } catch (error) {
        console.error(`Error running command in ${folderName}:`, error.stderr);
        process.exit(1);
    }
};

run();
