# Advent of Code Repository

## Summary

Welcome to the Advent of Code repository! This project is a collection of solutions and tools for tackling the [Advent of Code](https://adventofcode.com/) challenges. Advent of Code is an annual coding event where participants solve a series of programming puzzles, one for each day leading up to Christmas.

## Scripts

### `gen-day`

The `gen-day` script automates the setup for a new day's challenge. Use the following command to generate the required files:

```bash
node scripts/gen-day.mjs <year> <day>
```

Replace `<year>` and `<day>` with the desired Advent of Code year and day. This script utilizes [Hygen](http://www.hygen.io/) to scaffold the necessary files, fetches the input, and installs dependencies.

### `run-day`

The `run-day` script executes the solution for a specific day, with an optional `nosubmit` flag to avoid submitting to Advent of Code for scoring. To run a day's solution, use:

```bash
node scripts/run-day.mjs <year> <day> [nosubmit]
```

Replace `<year>` and `<day>` with the corresponding Advent of Code year and day. If the `nosubmit` flag is present, the solution won't be submitted. The script fetches the input, runs the solution, and, if submitting, posts the output to Advent of Code.

Note: Ensure you have a valid `session` environment variable in your `.env` file for successful submissions. To retrieve the session, just check your request when you see the input on the website.

Feel free to customize these scripts based on your specific needs and preferences. Happy coding!

```bash
npm run run-day-submit
```

This script will execute the solution and automatically submit it to the Advent of Code website. Make sure your solution is correct before using this script!
