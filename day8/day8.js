// test input
let input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split('\n').map((e) => {
    return {
        patterns: e.split('|')[0].trim().split(' '),
        numbers: e.split('|')[1].trim().split(' ')
    };
});

const part1 = input.reduce((prev, curr) => {
    return (
        prev +
        curr.numbers.filter(
            (e) => e.length === 2 || e.length === 3 || e.length === 4 || e.length === 7
        ).length
    );
}, 0);

const part2 = (i) => {
    const getUnique = (arr, l) => arr.filter((e) => l.includes(e.length));
    const gSignal = (sevenAndFour, seg6arr) => {
        const nine = seg6arr.filter((e) => {
            let counter = 0;
            sevenAndFour.split('').forEach((sevenAndFour_single) => {
                if (e.split('').includes(sevenAndFour_single)) {
                    counter++;
                }
            });
            return counter === 5;
        })[0];

        return nine.split('').filter((letter) => !sevenAndFour.split('').includes(letter))[0];
    };
    const aSignal = (one, seven) => {
        return seven
            .split('')
            .filter((letter) => {
                return !one.split('').includes(letter);
            })
            .join('');
    };
    const get6seg = (arr) => getUnique(arr, [6]);
    const get5seg = (arr) => getUnique(arr, [5]);
    const cSignal = (seg6, one, eight) => {
        const zeroAndNine = seg6.filter((n) => {
            return one.split('').every((e) => n.split('').includes(e));
        });
        const six = seg6.filter((e) => !zeroAndNine.includes(e))[0];

        return eight.split('').filter((letter) => !six.split('').includes(letter))[0];
    };

    const dSignal = (seg5, knownSignals) => {
        return seg5
            .filter((n) => knownSignals.every((e) => n.split('').includes(e)))[0]
            .split('')
            .filter((letter) => !knownSignals.includes(letter))[0];
    };

    const combine = (arr) => [...new Set(arr.join('').split(''))].join('');
    const segments = {
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
        f: null,
        g: null
    };
    return i.reduce((prev, e) => {
        const unique = getUnique(e.patterns, [2, 4, 3, 7]);
        const one = unique.filter((e) => e.length === 2)[0];
        const four = unique.filter((e) => e.length === 4)[0];
        const seven = unique.filter((e) => e.length === 3)[0];
        const eight = unique.filter((e) => e.length === 7)[0];

        const seg6 = get6seg(e.patterns);
        const seg5 = get5seg(e.patterns);

        const sevenAndFour = combine([seven, four]);

        segments['a'] = aSignal(one, seven);
        segments['g'] = gSignal(sevenAndFour, seg6);
        segments['c'] = cSignal(seg6, one, eight);
        segments['f'] = one.split('').filter((e) => e !== segments['c'])[0];
        segments['d'] = dSignal(seg5, [segments['a'], segments['c'], segments['f'], segments['g']]);
        segments['b'] = four
            .split('')
            .filter((letter) => ![segments['d'], segments['c'], segments['f']].includes(letter))[0];
        segments['e'] = eight
            .split('')
            .filter(
                (letter) =>
                    ![
                        segments['a'],
                        segments['b'],
                        segments['c'],
                        segments['d'],
                        segments['f'],
                        segments['g']
                    ].includes(letter)
            )[0];

        const fixedSignals = [
            [
                segments['a'],
                segments['b'],
                segments['c'],
                segments['e'],
                segments['f'],
                segments['g']
            ],
            [segments['c'], segments['f']],
            [segments['a'], segments['c'], segments['d'], segments['e'], segments['g']],
            [segments['a'], segments['c'], segments['d'], segments['f'], segments['g']],
            [segments['b'], segments['c'], segments['d'], segments['f']],
            [segments['a'], segments['b'], segments['d'], segments['f'], segments['g']],
            [
                segments['a'],
                segments['b'],
                segments['d'],
                segments['e'],
                segments['f'],
                segments['g']
            ],
            [segments['a'], segments['c'], segments['f']],
            [
                segments['a'],
                segments['b'],
                segments['c'],
                segments['d'],
                segments['e'],
                segments['f'],
                segments['g']
            ],
            [
                segments['a'],
                segments['b'],
                segments['c'],
                segments['d'],
                segments['f'],
                segments['g']
            ]
        ].map((e) => e.sort().join(''));
        const numbers = e.numbers.map((e) => e.split('').sort().join(''));

        const result = Number(
            numbers
                .map((n) => {
                    return fixedSignals.findIndex((v) => v === n);
                })
                .join('')
        );
        return prev + result;
    }, 0);
};

console.log('part1', part1);
console.log('part2', part2(input));
