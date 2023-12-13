import { readInputFile } from "../../utils.mjs";

const data = readInputFile(2023, 3);

const isGear = (s) => /\*/g.test(s);
const isSymbol = (s) => /^[^.0-9]$/g.test(s);
const isDigit = (n) => /\d/g.test(n);

const getNumberFromPoint = (i, j) => {
    let number = [];
    let n = j;
    while (isDigit(data[i].charAt(n))) {
        number.push(data[i].charAt(n++));
    }

    return { number: number.join(""), skip: n };
};

const getNumberFromPointBothWays = (i, j, checkedCoords) => {
    let number = [];
    let n = j;

    while (n < data[i].length && isDigit(data[i].charAt(n))) {
        checkedCoords[i][n] = true;
        number.push(data[i].charAt(n++));
    }

    n = j - 1;
    while (n > -1 && isDigit(data[i].charAt(n))) {
        checkedCoords[i][n] = true;
        number.unshift(data[i].charAt(n--));
    }

    return number.join("");
};

// checks for something in the surroundings
// * * *
// + s +
// ? ? ?
const checkSurroundings = (i, j, checker, limitJ) => {
    for (let m = j; m < (limitJ ?? j + 1); m++) {
        // if not topline, check top line * * *
        if (i !== 0) {
            if (m !== 0) {
                if (checker(data[i - 1].charAt(m - 1))) {
                    return true;
                }
            }

            if (checker(data[i - 1].charAt(m))) {
                return true;
            }

            if (m !== data[0].length - 1) {
                if (checker(data[i - 1].charAt(m + 1))) {
                    return true;
                }
            }
        }

        // check for  + s +
        if (m !== 0) {
            if (checker(data[i].charAt(m - 1))) {
                return true;
            }
        }

        if (m !== data[0].length - 1) {
            if (checker(data[i].charAt(m + 1))) {
                return true;
            }
        }

        // check for ? ? ?
        if (i !== data.length - 1) {
            if (m !== 0) {
                if (checker(data[i + 1].charAt(m - 1))) {
                    return true;
                }
            }

            if (checker(data[i + 1].charAt(m))) {
                return true;
            }

            if (m !== data[0].length - 1) {
                if (checker(data[i + 1].charAt(m + 1))) {
                    return true;
                }
            }
        }
    }

    return false;
};

const initDictionaryEntriesSquare = (i, dic) => {
    if (dic[i] === undefined) {
        dic[i] = {};
    }
    if (dic[i - 1] === undefined) {
        dic[i - 1] = {};
    }
    if (dic[i + 1] === undefined) {
        dic[i + 1] = {};
    }
};

// checks for something in the surroundings
// * * *
// + s +
// ? ? ?
const checkSurroundingNumbers = (i, m) => {
    const result = [];

    const checkedCoords = {};
    initDictionaryEntriesSquare(i, checkedCoords);
    // if not topline, check top line * * *
    if (i !== 0) {
        if (m !== 0) {
            if (!checkedCoords[i - 1][m - 1] && isDigit(data[i - 1].charAt(m - 1))) {
                const r = getNumberFromPointBothWays(i - 1, m - 1, checkedCoords);
                result.push(r);
            }
        }

        if (!checkedCoords[i - 1][m] && isDigit(data[i - 1].charAt(m))) {
            const r = getNumberFromPointBothWays(i - 1, m, checkedCoords);
            result.push(r);
        }

        if (m !== data[0].length - 1) {
            if (!checkedCoords[i - 1][m + 1] && isDigit(data[i - 1].charAt(m + 1))) {
                const r = getNumberFromPointBothWays(i - 1, m + 1, checkedCoords);
                result.push(r);
            }
        }
    }

    // check for  + s +
    if (m !== 0) {
        if (!checkedCoords[i][m - 1] && isDigit(data[i].charAt(m - 1))) {
            const r = getNumberFromPointBothWays(i, m - 1, checkedCoords);
            result.push(r);
        }
    }

    if (m !== data[0].length - 1) {
        if (!checkedCoords[i][m + 1] && isDigit(data[i].charAt(m + 1))) {
            const r = getNumberFromPointBothWays(i, m + 1, checkedCoords);
            result.push(r);
        }
    }

    // check for ? ? ?
    if (i !== data.length - 1) {
        if (m !== 0) {
            if (!checkedCoords[i + 1][m - 1] && isDigit(data[i + 1].charAt(m - 1))) {
                const r = getNumberFromPointBothWays(i + 1, m - 1, checkedCoords);
                result.push(r);
            }
        }

        if (!checkedCoords[i + 1][m] && isDigit(data[i + 1].charAt(m))) {
            const r = getNumberFromPointBothWays(i + 1, m, checkedCoords);
            result.push(r);
        }

        if (m !== data[0].length - 1) {
            if (!checkedCoords[i + 1][m + 1] && isDigit(data[i + 1].charAt(m + 1))) {
                const r = getNumberFromPointBothWays(i + 1, m + 1, checkedCoords);
                result.push(r);
            }
        }
    }

    return result;
};

// solution here
export const solve1 = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const line = data[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const validNumbers = [];
            if (isDigit(char)) {
                // get number on point
                const { number, skip } = getNumberFromPoint(i, j);

                const surroundings = checkSurroundings(i, j, isSymbol, skip);
                if (surroundings) {
                    validNumbers.push(parseInt(number, 10));
                }
                j = skip - 1;
            }

            sum += validNumbers.reduce((acc, curr) => (acc += curr), 0);
        }
    }

    return sum;
};

// solution here
export const solve2 = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const line = data[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (isGear(char)) {
                const surroundings = checkSurroundingNumbers(i, j);

                if (surroundings.length === 2) {
                    sum += surroundings.reduce((acc, curr) => (acc *= curr), 1);
                }
            }
        }
    }

    return sum;
};
