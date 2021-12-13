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

foldPieces = (p1, p2, direction) => {
    // console.log(p1.length === p2.length);
    // console.log({ p1: p1.length, p2: p2.length });
    // console.log(p1[0].length === p2[0].length);
    // console.log('direction', direction);
    // console.log('\n\n');
    if (direction === 'y') {
        return p1.map((row, rowIndex) => {
            return row.map((element, elementIndex) => {
                return element === '█' || p2[p2.length - rowIndex - 1][elementIndex] === '█'
                    ? '█'
                    : ' ';
            });
        });
    }
    return p1.map((row, rowIndex) => {
        return row.map((element, elementIndex) => {
            return element === '█' || p2[rowIndex][p2[rowIndex].length - elementIndex - 1] === '█'
                ? '█'
                : ' ';
        });
    });
};

const countDots = (pattern) => {
    let counter = 0;
    pattern.forEach((r) => {
        r.forEach((e) => {
            if (e === '#') {
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
        pattern[y][x] = '█';
        rowLength = pattern[y].length > rowLength ? pattern[y].length : rowLength;
        colLength = pattern.length > colLength ? pattern.length : colLength;
    });

    pattern = JSON.parse(JSON.stringify(pattern)).map((e) => {
        if (!e) {
            return new Array(rowLength).fill(' ');
        }
        if (e.length < rowLength) {
            return [...e.map((c) => c || ' '), ...new Array(rowLength - e.length).fill(' ')];
        }
        return e.map((c) => c || ' ');
    });
    fold.forEach((f, index) => {
        // console.log('pattern length', pattern.length);
        const foldDirection = f[0];
        const foldValue = f[1];
        p1 =
            foldDirection === 'y'
                ? pattern.slice(0, foldValue)
                : pattern.map((row) => {
                      return row.slice(0, foldValue);
                  });
        p2 =
            foldDirection === 'y'
                ? pattern.slice(foldValue)
                : pattern.map((row) => {
                      return row.slice(foldValue);
                  });

        pattern = foldPieces(p1, p2, foldDirection);
        // console.log('1:');
        // printGrid(p1);
        // console.log('2:');
        // printGrid(p2);
        if (index === 0) {
            part1 = countDots(pattern);
        }
    });
    //console.log('part1:', part1);
    printGrid(pattern);
};
solution();
