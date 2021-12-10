let input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split('\n').map((e) => e.split('').map(Number));

const lowPointsCords = () => {
    const lowPoints = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            const point = input[i][j];
            let adjacentLocations = [];
            let up = input[i + 1]?.[j];
            let down = input[i - 1]?.[j];
            let left = input[i]?.[j - 1];
            let right = input[i]?.[j + 1];
            adjacentLocations.push(...[up, down, left, right]);
            adjacentLocations = adjacentLocations.filter((p) => typeof p === 'number');
            if (point < Math.min(...adjacentLocations)) {
                lowPoints.push([i, j]);
            }
        }
    }
    return lowPoints;
};

const shouldAddToQueue = (n, cords, visited, queue) => {
    if (
        n === 9 ||
        typeof n === 'undefined' ||
        [...visited, ...queue].find((el) => el[0] === cords[0] && el[1] === cords[1])
    ) {
        return false;
    }
    return true;
};

const dfs = (grid, start) => {
    const visited = [];
    const queue = [start];

    while (queue.length !== 0) {
        const el = queue.pop();
        visited.push(el);

        const up = grid[el[0] - 1]?.[el[1]];
        const upCords = [el[0] - 1, el[1]];
        if (shouldAddToQueue(up, upCords, visited, queue)) {
            queue.push(upCords);
        }

        const down = grid[el[0] + 1]?.[el[1]];
        const downCords = [el[0] + 1, el[1]];
        if (shouldAddToQueue(down, downCords, visited, queue)) {
            queue.push(downCords);
        }

        const left = grid[el[0]]?.[el[1] - 1];
        const leftCords = [el[0], el[1] - 1];

        if (shouldAddToQueue(left, leftCords, visited, queue)) {
            queue.push(leftCords);
        }

        const right = grid[el[0]]?.[el[1] + 1];
        const rightCords = [el[0], el[1] + 1];
        if (shouldAddToQueue(right, rightCords, visited, queue)) {
            queue.push(rightCords);
        }
    }
    return visited.length;
};

const part1 = () => {
    return lowPointsCords().reduce((prev, curr) => prev + input[curr[0]][curr[1]] + 1, 0);
};

const part2 = () => {
    const cords = lowPointsCords()
        .map((cords) => dfs(input, cords))
        .sort((a, b) => a - b);

    return cords.slice(cords.length - 3, cords.length).reduce((prev, curr) => prev * curr, 1);
};

console.log('part1:', part1());
console.log('part2:', part2());
