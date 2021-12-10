// test input
let input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString();

input = input.split('\n').map((e) => e.split(''));

const solve = () => {
    const open = ['(', '[', '{', '<'];
    const close = [')', ']', '}', '>'];
    const scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let score = 0;
    let score2 = [];

    input.forEach((line) => {
        const stack = [line[0]];
        for (let i = 1; i < line.length; i++) {
            const bracket = line[i];
            const isOpen = open.includes(bracket);
            if (isOpen) {
                stack.push(bracket);
            } else {
                const lastElement = stack[stack.length - 1];
                const lastElIndex = open.indexOf(lastElement);
                const bracketIndex = close.indexOf(bracket);

                if (lastElIndex === bracketIndex) {
                    stack.pop();
                } else {
                    score = score + scores[bracket];
                    break;
                }
            }
            if (i + 1 === line.length) {
                let stackScore = 0;
                stack.reverse().forEach((bracket) => {
                    stackScore = 5 * stackScore + (open.indexOf(bracket) + 1);
                });
                score2.push(stackScore);
            }
        }
    });

    return { score, score2: score2.sort((a, b) => a - b)[Math.floor(score2.length / 2)] };
};
const { score, score2 } = solve();
console.log('part1: ', score);
console.log('part2: ', score2);
