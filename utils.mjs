import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getDirName = () => {
    const __filename = fileURLToPath(import.meta.url);

    return path.dirname(__filename);
};

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

export const writeToFile = (fileName, content) => {
    const absoluteFileName = path.join(__dirname, fileName);
    console.log("absolute", absoluteFileName, fileName);
    ensureDirectoryExistence(absoluteFileName);
    fs.writeFile(absoluteFileName, content, (err) => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
};

export const readFile = (fileName) => {
    const absoluteFileName = path.join(__dirname, fileName);
    return fs.readFileSync(absoluteFileName, "utf8").split("\n");
};

export const readInputFile = (year, day) => {
    return readFile(`${year}/${day < 10 ? `0${day}` : day}/input.txt`);
};
