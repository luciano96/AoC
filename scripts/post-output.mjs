import "dotenv/config";
import { parse } from 'node-html-parser';

const postOutput = ({ year, day, level, answer }) => {
    const actualDay = day.charAt(0) === "0" ? day.substring(1) : day;

    fetch(`https://adventofcode.com/${year}/day/${actualDay}/answer`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: `session=${process.env.session}`,
        },
        body: new URLSearchParams({
            level,
            answer,
        }),
    })
        .then((response) => response.text())
        .then((response) => Promise.resolve(parse(response)))
        .then((response) =>
            console.log("=> response", response.getElementsByTagName("main")[0].innerText)
        );
};

export const run = async ({ year, day, level, answer }) => {
    try {
        postOutput({ year, day, level, answer });
    } catch (error) {
        console.error(`Error posting output for ${year} ${day}`);
        process.exit(1);
    }
};
