let input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split('\n').map((e) => e.split('').map(Number));

const getOctopusToFlash = (grid, increment, flashed) => {
    const octopusToFlash = [];
    for (let j = 0; j < grid.length; j++) {
        for (let k = 0; k < grid[0].length; k++) {
            if (increment) {
                grid[j][k]++;
            }
            if (grid[j][k] > 9 && !hasAlreadyFlashed(flashed, [j, k])) {
                octopusToFlash.push([j, k]);
            }
        }
    }
    return octopusToFlash;
};

const hasAlreadyFlashed = (arr, cords) => {
    return !!arr.find((e) => e[0] === cords[0] && e[1] === cords[1]);
};

const solve = (iterations) => {
    const grid = JSON.parse(JSON.stringify(input));
    let allFlashes = 0;
    let iters = 0;
    for (let i = 0; i < iterations; i++) {
        const flashed = [];
        let flashQueue = getOctopusToFlash(grid, true, flashed);

        while (flashQueue.length !== 0) {
            const flash = flashQueue.pop();
            flashed.push(flash);
            const [a, b] = flash;

            const top = grid[a + 1]?.[b];
            if (typeof top !== 'undefined') {
                grid[a + 1][b]++;
            }

            const topRight = grid[a + 1]?.[b + 1];
            if (typeof topRight !== 'undefined') {
                grid[a + 1][b + 1]++;
            }

            const right = grid[a][b + 1];
            if (typeof right !== 'undefined') {
                grid[a][b + 1]++;
            }
            const bottomRight = grid[a - 1]?.[b + 1];
            if (typeof bottomRight !== 'undefined') {
                grid[a - 1][b + 1]++;
            }

            const bottom = grid[a - 1]?.[b];
            if (typeof bottom !== 'undefined') {
                grid[a - 1][b]++;
            }

            const bottomLeft = grid[a - 1]?.[b - 1];
            if (typeof bottomLeft !== 'undefined') {
                grid[a - 1][b - 1]++;
            }

            const left = grid[a]?.[b - 1];
            if (typeof left !== 'undefined') {
                grid[a][b - 1]++;
            }

            const topLeft = grid[a + 1]?.[b - 1];
            if (typeof topLeft !== 'undefined') {
                grid[a + 1][b - 1]++;
            }
            flashQueue = getOctopusToFlash(grid, false, flashed);
        }
        flashed.forEach(([a, b]) => {
            grid[a][b] = 0;
        });
        if (flashed.length === grid.length * grid[0].length) {
            iters = i + 1;
            break;
        }
        allFlashes = allFlashes + flashed.length;
    }
    return iterations === 100 ? allFlashes : iters;
};

console.log('part1:', solve(100));
console.log('part2:', solve(100000));
