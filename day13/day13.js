let input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

const printGrid = (pattern) => {
    pattern.forEach((row) => {
        row.forEach((e) => {
            process.stdout.write(e);
        });
        process.stdout.write('\n');
    });
    process.stdout.write('===========\n');
};
const dot = '█';
const empty = ' ';

foldPieces = (p1, p2, direction) => {
    if (direction === 'y') {
        return p1.map((row, rowIndex) => {
            return row.map((element, elementIndex) => {
                return element === dot || p2[p1.length - rowIndex - 1]?.[elementIndex] === dot
                    ? dot
                    : empty;
            });
        });
    }
    return p1.map((row, rowIndex) => {
        return row.map((element, elementIndex) => {
            return element === dot || p2[rowIndex]?.[p2[rowIndex].length - elementIndex - 1] === dot
                ? dot
                : empty;
        });
    });
};

const countDots = (pattern) => {
    let counter = 0;
    pattern.forEach((r) => {
        r.forEach((e) => {
            if (e === dot) {
                counter = counter + 1;
            }
        });
    });
    return counter;
};

const solution = () => {
    let part1 = 0;
    const cords = input
        .split('\n\n')[0]
        .split('\n')
        .map((e) => [+e.split(',')[0], +e.split(',')[1]]);

    const fold = input
        .split('\n\n')[1]
        .split('\n')
        .map((e) => e.split(' ')[2])
        .map((e) => [e.split('=')[0], +e.split('=')[1]]);

    let pattern = [];
    let rowLength = 0;
    let colLength = 0;

    cords.forEach(([x, y]) => {
        pattern[y] = pattern[y] || [];
        pattern[y][x] = dot;
        rowLength = pattern[y].length > rowLength ? pattern[y].length : rowLength;
        colLength = pattern.length > colLength ? pattern.length : colLength;
    });

    pattern = JSON.parse(JSON.stringify(pattern)).map((e) => {
        if (!e) {
            return new Array(rowLength).fill(empty);
        }
        if (e.length < rowLength) {
            return [...e.map((c) => c || empty), ...new Array(rowLength - e.length).fill(empty)];
        }
        return e.map((c) => c || empty);
    });
    fold.forEach((f, index) => {
        const foldDirection = f[0];
        const foldValue = f[1];
        const isYFold = foldDirection === 'y';
        p1 = isYFold
            ? pattern.slice(0, foldValue)
            : pattern.map((row) => {
                  return row.slice(0, foldValue);
              });
        p2 = isYFold
            ? pattern.slice(foldValue + 1)
            : pattern.map((row) => {
                  return row.slice(foldValue + 1);
              });

        pattern = foldPieces(p1, p2, foldDirection);
        if (index === 0) {
            part1 = countDots(pattern);
        }
    });
    console.log('part1:', part1);
    console.log('part2:');
    printGrid(pattern);
};
solution();
