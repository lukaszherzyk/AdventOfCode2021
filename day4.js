const { performance } = require('perf_hooks');

const now = performance.now();

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;
console.log('########################################################################');
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
        console.log('+++++++++++++++');
        for (let j = 0; j < 5; j++) {
            // rows
            if (boards[i][j].every((e) => e.checked)) {
                console.log('FIND ROW!', boards[i][j]);
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
