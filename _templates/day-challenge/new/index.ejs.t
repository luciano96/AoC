---
to: <%= year %>/<%= day %>/index.mjs
unless_exists: true
---
import { readInputFile } from "../../utils.mjs";

const data = readInputFile(<%= year %>, <%= day %>);

// solution here
export const solve1 = () => {

};

// solution here
export const solve2 = () => {

};