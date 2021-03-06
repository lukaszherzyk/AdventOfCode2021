const { performance } = require('perf_hooks');

const now = performance.now();
let input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

const numbers = input.split('\n')[0].split(',').map(Number);
let boards = input
    .split(/\n\s*\n/)
    .slice(1)
    .map((e) => e.split('\n'))
    .map((e) =>
        e
            .map((e) => e.trim())
            .map((e) => e.replace(/  +/g, ' '))
            .map((e) => e.split(' ').map((e) => ({ value: Number(e), checked: false })))
    );

for (let number of numbers) {
    let hasFound = false;
    let sum = 0;

    boards = boards.map((board) => {
        return board.map((row) => {
            return row.map((e) => {
                if (e.value === number) {
                    return { value: e.value, checked: true };
                }
                return e;
            });
        });
    });
    // check if any row/column
    for (let i = 0; i < boards.length; i++) {
        // columns
        for (let x = 0; x < 5; x++) {
            const columns = [];
            for (let y = 0; y < 5; y++) {
                columns.push(boards[i][y][x]);
            }
            if (columns.every((e) => e.checked)) {
                console.log('BENEK');
                hasFound = true;
                sum = boards[i].reduce((prev, curr) => {
                    return (
                        prev +
                        curr.reduce((p, c) => {
                            if (c.checked) {
                                return p;
                            }
                            return p + c.value;
                        }, 0)
                    );
                }, 0);
                break;
            }
        }

        for (let j = 0; j < 5; j++) {
            // rows
            if (boards[i][j].every((e) => e.checked)) {
                hasFound = true;
                sum = boards[i].reduce((prev, curr) => {
                    return (
                        prev +
                        curr.reduce((p, c) => {
                            if (c.checked) {
                                return p;
                            }
                            return p + c.value;
                        }, 0)
                    );
                }, 0);
                console.log('sum', sum);
                break;
            }

            // console.log('FOR___', boards[i][j]);
        }
    }
    if (hasFound) {
        console.log('result num * sum::', sum * number);
        break;
    }
}

console.log('TOOK:', performance.now() - now);
