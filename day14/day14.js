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

const solution = (iterations) => {
    let template = input[0];
    const insertions = new Map();
    const counter = new Map();

    input[1].split('\n').forEach((e) => {
        const [a, b] = e.split(' -> ');
        insertions.set(a, b);
    });
    template.split('').forEach((l) => {
        if (counter.has(l)) {
            counter.set(l, counter.get(l) + 1);
        } else {
            counter.set(l, 1);
        }
    });

    for (let i = 0; i < iterations; i++) {
        let newTemplate = '';
        for (let j = 0; j < template.length - 1; j++) {
            const pair = template.split('').slice(j, j + 2);
            const x = insertions.get(pair.join(''));
            newTemplate += (j === 0 ? pair[0] : '') + insertions.get(pair.join('')) + pair[1];
        }
        template = newTemplate;
        console.log('template length', template.length);
        console.log(`iter ${i + 1}:`, (performance.now() - now) / 1000);
        //console.log('cache', cache);
        console.log('=======');
    }

    template.split('').forEach((l) => {
        if (counter.has(l)) {
            counter.set(l, counter.get(l) + 1);
        } else {
            counter.set(l, 1);
        }
    });

    const c = [];
    for ([key, value] of counter) {
        c.push(value);
    }
    return Math.max(...c) - Math.min(...c);
};

const now = performance.now();
console.log('part1:', solution(18));
console.log('elapsed: ', (performance.now() - now) / 1000);
