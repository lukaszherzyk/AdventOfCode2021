let input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split('\n\n');
const { performance } = require('perf_hooks');

const addToMap = (m, s1, s2, v) => {
    if (m.has(s1)) {
        m.set(s1, { ...m.get(s1), ...(s2 ? { [s2]: (m.get(s1)[s2] || 0) + v } : {}) });
    } else {
        m.set(s1, {
            ...(s2 ? { [s2]: v } : {})
        });
    }
};
const mapCounter = (m, s1, v) => {
    if (m.has(s1)) {
        m.set(s1, m.get(s1) + v);
    } else {
        m.set(s1, v);
    }
};
const solution = (iterations) => {
    let template = input[0];
    const insertions = new Map();
    let c = new Map();
    let m = new Map();

    for (let j = 0; j < template.length; j++) {
        const l = template[j];
        const sib = template[j + 1];
        addToMap(m, l, sib, 1);
        mapCounter(c, l, 1);
    }

    input[1].split('\n').forEach((e) => {
        const [a, b] = e.split(' -> ');
        insertions.set(a, b);
    });
    for (let j = 0; j < iterations; j++) {
        const newMap = new Map();
        for (const [s1, value] of m) {
            const valueKeys = Object.keys(value);
            valueKeys.forEach((s2) => {
                const insert = insertions.get(s1 + s2);
                addToMap(newMap, insert, s2, value[s2]);
                addToMap(newMap, s1, insert, value[s2]);
                mapCounter(c, insert, value[s2]);
            });
        }
        m = new Map(newMap);
    }
    let arr = [];
    for (const [key, value] of c) {
        arr.push(value);
    }

    return Math.max(...arr) - Math.min(...arr);
};

let now = performance.now();
console.log('part1:', solution(10));
console.log('part1 time: ', performance.now() - now);

now = performance.now();
console.log('part2:', solution(40));
console.log('part2 time: ', performance.now() - now);
