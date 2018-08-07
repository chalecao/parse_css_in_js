var babel = require('babel-core');
var wrapper = require('../src');


// convert from a buffer to a string
var code = `
var a = [1,2,4];
`;
// use our plugin to transform the source
var out = babel.transform(code, {
    plugins: [wrapper]
});

// print the generated code to screen
console.log(out.code);
