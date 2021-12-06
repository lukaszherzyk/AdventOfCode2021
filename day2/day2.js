const input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

const solution = input
    .split('\n')
    .map((d) => d.split(' '))
    .reduce(
        (prev, current) => {
            const [command, value] = current;
            if (command === 'forward') {
                return { ...prev, horizontal: prev.horizontal + Number(value) };
            }
            if (command === 'down') {
                return { ...prev, depth: prev.depth + Number(value) };
            }
            if (command === 'up') {
                return { ...prev, depth: prev.depth - Number(value) };
            }
        },
        { depth: 0, horizontal: 0 }
    );

const day1value = solution.depth * solution.horizontal;
console.log('part1:', day1value);

// day2
const solution2 = input
    .split('\n')
    .map((d) => d.split(' '))
    .reduce(
        (prev, current) => {
            const [command, value] = current;
            if (command === 'forward') {
                return {
                    ...prev,
                    horizontal: prev.horizontal + Number(value),
                    depth: prev.depth + prev.aim * Number(value)
                };
            }
            if (command === 'down') {
                return { ...prev, aim: prev.aim + Number(value) };
            }
            if (command === 'up') {
                return { ...prev, aim: prev.aim - Number(value) };
            }
        },
        { depth: 0, horizontal: 0, aim: 0 }
    );

const day2value = solution2.depth * solution2.horizontal;
console.log('part2:', day2value);
