import { readInputFile } from "../../utils.mjs";

const data = readInputFile(2023, 2);

const filterColor = (color) => (gameLine) =>
    gameLine.filter((g) => g[1] === color).map((g) => [parseInt(g[0], 10), g[1]]);

const processForColor = (color) => (gameLine) =>
    gameLine
        .map(filterColor(color))
        .filter((a) => a.length > 0)
        .map((g) => g.flat(1));

const processGameLine = (game) => {
    const blues = processForColor("blue")(game);
    const red = processForColor("red")(game);
    const green = processForColor("green")(game);

    const maxBlue = Math.max(...blues.map((color) => color[0]));
    const maxRed = Math.max(...red.map((color) => color[0]));
    const maxGreen = Math.max(...green.map((color) => color[0]));

    return { blue: maxBlue, red: maxRed, green: maxGreen };
};

const isValidGame1 = (maxCubes) => {
    const possible = {
        red: 12,
        green: 13,
        blue: 14,
    };

    return (
        maxCubes.red <= possible.red &&
        maxCubes.blue <= possible.blue &&
        maxCubes.green <= possible.green
    );
};

export const getMinimumCubesPerGame = () => {
    // Game 1: ... => [Game 1, ...] => [Game, 1] => 1
    const splitGamesCubes = data.map((game) => game.split(":"));

    const gameSets = splitGamesCubes.map(([_, Cubes]) =>
        Cubes.split(";").map((cubeShown) =>
            cubeShown.split(",").map((s) => s.split(" ").filter((s) => s !== ""))
        )
    );

    return gameSets.map(processGameLine);
};

// solution pt1 here
export const solve1 = () => {
    const gameIds = splitGamesCubes.map(([GameId, _]) => parseInt(GameId.split(" ")[1], 10));

    // max number color of each cube per game
    const minCubesPerGame = getMinimumCubesPerGame();

    const validGameInds = [];
    minCubesPerGame.forEach((game, idx) => {
        if (isValidGame1(game)) {
            validGameInds.push(idx);
        }
    });

    return validGameInds.reduce((acc, curr) => (acc += gameIds[curr]), 0);
};

//solve pt2 here
export const solve2 = () => {
    const minCubesPerGame = getMinimumCubesPerGame();

    return minCubesPerGame.reduce((acc, curr) => (acc += curr.blue * curr.green * curr.red), 0);
};
