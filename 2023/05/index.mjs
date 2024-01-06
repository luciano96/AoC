import { extractNumbersFromString, readInputFile } from "../../utils.mjs";

const data = readInputFile(2023, 5);

const maps = [
    "seed-to-soil map",
    "soil-to-fertilizer map",
    "fertilizer-to-water map",
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
];
const mapDict = {};
const getSeedsFromInput1 = () => extractNumbersFromString(data[0]);
const getSeedsFromInput2 = () => {
    const seedFormula = getSeedsFromInput1();
    const result = [];
    for (let i = 0; i < seedFormula.length; i += 2) {
        result.push({ source: seedFormula[i], dest: seedFormula[i] + seedFormula[i + 1] });
    }

    return result;
};

let mapInd = 0;
let startSaving = false;
data.forEach((line) => {
    if (line.includes(maps[mapInd])) {
        mapInd++;
        startSaving = true;
    } else {
        if (startSaving && line !== "") {
            mapDict[maps[mapInd - 1]] = [
                ...(mapDict[maps[mapInd - 1]] ?? []),
                extractNumbersFromString(line),
            ];
        }
    }
});

const isInRange =
    (n) =>
    ([_, source, range]) => {
        return n >= source && n < source + range;
    };

const mapSourceToDest = (map) => (newSource) => {
    const foundMap = map.find(isInRange(newSource));
    if (!foundMap) {
        return { source: newSource, dest: newSource };
    } else {
        const [dest, source, _] = foundMap;

        return { source, dest: newSource - (source - dest) };
    }
};

const mapSeedToSoil = (seeds) => {
    const map = mapDict[maps[0]];
    return seeds.map((seed) => {
        const foundMap = map.find(isInRange(seed));
        if (!foundMap) {
            return { source: seed, dest: seed };
        } else {
            const [dest, source, _] = foundMap;

            return { source: seed, dest: seed - (source - dest) };
        }
    });
};

// solution here
export const solve1 = () => {
    const seeds = getSeedsFromInput1();
    let prev = mapSeedToSoil(seeds);
    for (let i = 1; i < maps.length; i++) {
        let xSeed = prev.reduce((acc, curr) => [...acc, curr.dest], []);
        prev = xSeed.map(mapSourceToDest(mapDict[maps[i]]));
    }

    return Math.min(...prev.reduce((acc, curr) => [...acc, curr.dest], []));
};

const createNewSeeedRanges = (seedsToSearch, soils) => {
    const mappedSoils = [];

    while (seedsToSearch.length > 0) {
        const seed = seedsToSearch.pop();
        const findFit = soils.find(isInRange(seed.source));

        if (findFit) {
            const f = isInRange(seed.dest)(findFit);

            if (!f) {
                seedsToSearch.push({ source: seed.source + findFit[2], dest: seed.dest });
                mappedSoils.push({
                    source: seed.source - findFit[1] + findFit[0],
                    dest: seed.source + findFit[2] - findFit[1] + findFit[0],
                });
            } else {
                mappedSoils.push({
                    source: seed.source - findFit[1] + findFit[0],
                    dest: seed.dest - findFit[1] + findFit[0],
                });
            }
        }
    }

    return mappedSoils;
};

// solution here
export const solve2 = () => {
    const seeds = getSeedsFromInput2();

    let seedsToSearch = [...seeds];

    for (let i = 0; i < maps.length; i++) {
        const mappeds = mapDict[maps[i]];
        const result = createNewSeeedRanges(seedsToSearch, mappeds);
        seedsToSearch = result;
    }

    // console.log(">", seeds);
    // console.log(">", seedsToSearch);
    return Math.min(...seedsToSearch.reduce((acc, curr) => [...acc, curr.source], []));
};
