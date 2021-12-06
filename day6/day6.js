let input = require('fs')
    .readFileSync(__dirname + '/input.txt')
    .toString()
    .split(',')
    .map(Number);

const solution = (days) => {
    const dic = new Array(9).fill(0);
    input.forEach((n) => {
        dic[n] = dic[n] + 1;
    });

    for (let day = 0; day < days; day++) {
        const zeros = dic.shift();
        dic[6] = dic[6] + zeros;
        dic.push(zeros);
    }
    return dic.reduce((prev, curr) => prev + curr, 0);
};

console.log('part 1:', solution(80));
console.log('part 2:', solution(256));
