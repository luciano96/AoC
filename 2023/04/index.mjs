import {
    extractNumbersFromString, readInputFile,
    reduceSumNumberArray
} from "../../utils.mjs";

const data = readInputFile(2023, 4);

// transforms Card 1: 12 | 32 45 in [[1], [12], [32, 45]]
const transformInput = (line) =>
    line
        .split(":")
        .map((s) => s.split("|"))
        .flat(1)
        .map(extractNumbersFromString);

// input is array [[cardId], [winningNumbers], [myNumbers]]
const getPointsPerLine = (transformedLine) => {
    let points = 0;
    const winningNumbers = transformedLine[1];
    const myNumbers = transformedLine[2];

    myNumbers.forEach((n) => {
        if (winningNumbers.includes(n)) {
            if (points === 0) {
                points = 1;
            } else {
                points *= 2;
            }
        }
    });

    return points;
};

// input is array [[cardId], [winningNumbers], [myNumbers]]
const getCopiesPerLine = (transformedLine, i) => {
    let copies = 0;
    const winningNumbers = transformedLine[1];
    const myNumbers = transformedLine[2];

    myNumbers.forEach((n) => {
        if (winningNumbers.includes(n)) {
            copies++;
        }
    });

    return copies;
};

// solution here
export const solve1 = () =>
    data.map(transformInput).map(getPointsPerLine).reduce(reduceSumNumberArray, 0);

// solution here
export const solve2 = () => {
    const copiesPerOriginal = data.map(transformInput).map(getCopiesPerLine);
    const cardCopies = new Array(copiesPerOriginal.length).fill(1);

    // for all the scratchcards
    for (let i = 0; i < copiesPerOriginal.length; i++) {
        // for each of the card copies
        for (let j = 0; j < cardCopies[i]; j++) {
            // sequentially add the available copies to the next scratchcards,
            for (let k = i + 1, l = 0; l < copiesPerOriginal[i]; l++, k++) {
                cardCopies[k]++;
            }
        }
    }

    return cardCopies.reduce(reduceSumNumberArray, 0);
};
