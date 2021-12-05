let input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

// part 1

const part1 = input.split('\n').reduce((prev, curr, index, arr) => {
    let nextValue = prev ? [...prev.bits] : new Array(curr.length).fill(0);

    curr.split('').forEach((bit, index) => {
        nextValue[index] = nextValue[index] + Number(bit);
    });

    if (index + 1 === arr.length) {
        const gamma = nextValue.map((n) => {
            return n >= prev.arrLength / 2 ? 1 : 0;
        });
        const epsilon = nextValue.map((n) => {
            return n >= prev.arrLength / 2 ? 0 : 1;
        });
        return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
    }
    return { bits: nextValue, arrLength: arr.length };
}, null);
console.log('part 1:', part1);
//part 2

input = input.split('\n').map((bits) => {
    return bits.split('').map(Number);
});

const countBits = (i) => {
    return i.reduce((prev, curr, index, arr) => {
        let nextValue = prev ? [...prev.bits] : new Array(curr.length).fill(0);

        curr.forEach((bit, index) => {
            nextValue[index] = nextValue[index] + Number(bit);
        });

        return { bits: nextValue, arrLength: arr.length };
    }, null);
};

let initBits = countBits(input);
let result = input;

let filtered = [];
for (let i = 0; i < initBits.bits.length; i++) {
    initBits = countBits(result);
    result = result.filter((n) => {
        if (initBits.bits[i] >= initBits.arrLength / 2 && n[i] === 1) {
            return true;
        }
        if (initBits.bits[i] < initBits.arrLength / 2 && n[i] === 0) {
            return true;
        }
    });
    if (result.length === 1) {
        break;
    }
}
let x = parseInt(result[0].join(''), 2);

initBits = countBits(input);
result = input;

filtered = [];
for (let i = 0; i < initBits.bits.length; i++) {
    initBits = countBits(result);
    result = result.filter((n) => {
        if (initBits.bits[i] >= initBits.arrLength / 2 && n[i] === 0) {
            return true;
        }
        if (initBits.bits[i] < initBits.arrLength / 2 && n[i] === 1) {
            return true;
        }
    });
    if (result.length === 1) {
        break;
    }
}
let y = parseInt(result[0].join(''), 2);

console.log('part 2:', x * y);
