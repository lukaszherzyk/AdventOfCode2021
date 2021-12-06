const input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString()
    .split('\n')
    .map((e) => {
        const [a, b] = e.split('->');
        const [x1, y1] = a.split(',');
        const [x2, y2] = b.split(',');
        return {
            x1: Number(x1),
            y1: Number(y1),
            x2: Number(x2),
            y2: Number(y2)
        };
    });

const solve = (calcDiagonal) => {
    const obj = {};

    input.forEach(({ x1, y1, x2, y2 }) => {
        const xMin = Math.min(x1, x2);
        const xMax = Math.max(x1, x2);

        const yMin = Math.min(y1, y2);
        const yMax = Math.max(y1, y2);

        const xDistance = xMax - xMin;
        const yDistance = yMax - yMin;

        const isVertical = xDistance === 0 || yDistance === 0;
        if (isVertical) {
            if (xDistance === 0) {
                for (let i = 0; i <= yDistance; i++) {
                    obj[x1] = obj[x1] ?? [];
                    obj[x1][yMin + i] = obj[x1][yMin + i] ?? 0;

                    obj[x1][yMin + i] = obj[x1][yMin + i] + 1;
                }
            } else {
                for (let i = 0; i <= xDistance; i++) {
                    obj[xMin + i] = obj[xMin + i] ?? [];
                    obj[xMin + i][y1] = obj[xMin + i][y1] ?? 0;

                    obj[xMin + i][y1] = obj[xMin + i][y1] + 1;
                }
            }
        } else if (calcDiagonal) {
            for (let i = 0; i <= xDistance; i++) {
                const x = x1 > x2 ? x1 - i : x1 + i;
                const y = y1 > y2 ? y1 - i : y1 + i;

                obj[x] = obj[x] ?? [];
                obj[x][y] = obj[x][y] ?? 0;

                obj[x][y] = obj[x][y] + 1;
            }
        }
    });

    let sum = 0;
    Object.keys(obj).forEach((e) => {
        obj[e].forEach((n) => {
            if (n > 1) {
                sum = sum + 1;
            }
        });
    });
    return sum;
};

console.log('part1: ', solve(false));
console.log('part2: ', solve(true));
