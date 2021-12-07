// test input
let input = '16,1,2,0,4,2,7,1,2,14';

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split(',').map(Number);

const part1 = () => {
    const median = input.sort((a, b) => a - b)[Math.floor(input.length / 2)];

    return input.reduce((prev, curr) => prev + Math.abs(curr - median), 0);
};

const sum = (n) => {
    let s = 0;
    for (let i = 1; i <= n; i++) {
        s = s + i;
    }
    return s;
};

const part2 = () => {
    let avg = Math.floor(input.reduce((prev, curr) => prev + curr, 0) / input.length);

    return input.reduce((prev, curr) => prev + sum(Math.abs(curr - avg)), 0);
};

console.log('part1: ', part1());
console.log('part2: ', part2());
