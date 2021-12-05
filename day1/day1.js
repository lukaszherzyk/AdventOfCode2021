const input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

// part 1
const part1 = input
    .split('\n')
    .map((n) => Number(n))
    .reduce((prev, current, i, arr) => {
        if (i === 0) {
            return 0;
        }
        return current > arr[i - 1] ? prev + 1 : prev;
    }, 0);
console.log('part1: ', part1);

// part 2
const part2 = input
    .split('\n')
    .map((n) => Number(n))
    .reduce((prev, current, i, arr) => {
        if (i === 0 || i === 1 || i === 2) {
            return 0;
        }
        const a = arr[i - 1] + arr[i - 2] + arr[i - 3];
        const b = current + arr[i - 1] + arr[i - 2];

        return b > a ? prev + 1 : prev;
    }, 0);
console.log('part2: ', part2);
