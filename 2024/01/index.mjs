import { myParseInt, readInputFile } from "../../utils.mjs";

const data = readInputFile(2024, 1);

const map = data.map((s) => s.trim().split("   ").map(myParseInt));
const joinFirst = map.reduce((acc, [first, second]) => [...acc, first], []);
const joinSecond = map.reduce((acc, [first, second]) => [...acc, second], []);
// solution here
export const solve1 = () => {
    const left = joinFirst.sort();
    const right = joinSecond.sort();
    let sum = 0;
    for (let i = 0; i < joinFirst.length; i++) {
        sum = sum + Math.abs(left[i] - right[i]);
    }

    return sum;
};

// solution here
export const solve2 = () => {
    const mapOcurrences = new Map();
    const mapSecondPositions = new Map();

    let firstCount = 0;
    for (let i = 0; i < joinSecond.length; i++) {
        const firstListElement = joinFirst[0];
        const secondListElement = joinSecond[i];
        mapSecondPositions.set(
            secondListElement,
            [...(mapSecondPositions.get(secondListElement) || []), i]
        );

        if (firstListElement === secondListElement) {
            firstCount++;
        }
    }

    let sumResult = firstCount * joinFirst[0];
    mapOcurrences.set(joinFirst[0], firstCount * joinFirst[0]);

    for (let i = 1; i < joinFirst.length; i++) {
        const firstListElement = joinFirst[i];
        if (mapOcurrences.has(firstListElement)) {
            sumResult += mapOcurrences.get(i);
            continue;
        } else {
            if (mapSecondPositions.has(firstListElement)) {
                const positions = mapSecondPositions.get(firstListElement);
                sumResult += positions.length * firstListElement;

                mapOcurrences.set(firstListElement, positions.length * firstListElement);
            }
        }
    }

    return sumResult;
};
