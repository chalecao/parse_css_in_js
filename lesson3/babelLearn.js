
var babylon = require('babylon');
const traverse = require('babel-traverse').default
var generator = require('babel-generator').CodeGenerator;
var btypes = require('babel-types')

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
/**
* comments:注释内容
* loc:location
* program:程序的ast
* tokens: 程序拆分出来的字符串
*/
var ast = babylon.parse(code);
// console.log(JSON.stringify(ast, null, 4))

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: 'render' })) {
            let name = path.node.name+"_fed123";
            path.replaceWith(btypes.identifier(name))
        }
    }
})

var regenerated_code = new generator(ast, {}, code).generate();
console.log(JSON.stringify(regenerated_code, null, 4))
