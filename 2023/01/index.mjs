import { readInputFile } from "../../utils.mjs";
const digits = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

const array = readInputFile(2023, 1);

const findFirst = (string) => {
    for (let i = 0; i < string.length; i++) {
        const found = digits.findIndex((t) => string.substring(i).startsWith(t));
        if (found > -1) {
            return digits[found % 9];
        }
    }

    return "0";
};
const findLast = (string) => {
    for (let i = string.length; i > -1; i--) {
        const found = digits.findIndex((t) => string.substring(i).startsWith(t));

        if (found > -1) {
            return digits[found % 9];
        }
    }

    return "0";
};

export const solve = () => {
    return array
        .map((a) => `${findFirst(a)}${findLast(a)}`)
        .map((n) => parseInt(n, 10))
        .reduce((cur, acc) => acc + cur, 0);
};