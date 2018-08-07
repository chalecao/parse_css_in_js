var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require("escodegen");

var code = `
const view = {
    a: 3,
    init: () => {
        view.a = 5;
    },
    render: () => {

    }
}
`;
var ast = esprima.parse(code);
// console.log(JSON.stringify(ast, null, 4))

estraverse.traverse(ast, {
    enter: function (node) {
        node.name += "_fed123";
    }
});
var regenerated_code = escodegen.generate(ast)
console.log(JSON.stringify(regenerated_code, null, 4))
