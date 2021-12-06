const { performance } = require('perf_hooks');

const perf = (fn) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`elapsed: ${end - start}ms`);
};

module.exports = { perf };
