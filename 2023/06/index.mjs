import { extractNumbersFromString, readExampleFile, readInputFile } from "../../utils.mjs";

const data = readInputFile(2023, 6);
const dataExample = readExampleFile(2023, 6);

const groupedByRace = (data) => {
    const inputData = data.map(extractNumbersFromString);

    const zip_data = [];

    for (let i = 0; i < inputData[0].length; i++) {
        zip_data.push([inputData[0][i], inputData[1][i]]);
    }

    console.log(inputData);

    return zip_data;
};

const onlyOneRace = (data) => {
    const inputData = data.map(extractNumbersFromString);
    const mapData = inputData.map((s) => parseInt(s.join(""), 10));

    return mapData;
};

const getNewRecords = ([time, distance]) => {
    let bigger = 0;

    for (let i = 1; i < time - 1; i++) {
        if ((time - i) * i > distance) {
            bigger += 1;
        }
    }

    return bigger;
};

// solution here
export const solve1 = () => {
    const groupedData = groupedByRace(data);

    return groupedData.reduce((acc, curr) => acc * getNewRecords(curr), 1);
};

// solution here
export const solve2 = () => {
    const o = onlyOneRace(data);
    return getNewRecords(o);
};