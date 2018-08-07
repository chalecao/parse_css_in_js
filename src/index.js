/**
 * doc: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#%E7%BC%96%E5%86%99%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-babel-%E6%8F%92%E4%BB%B6
 * @param {*} babel 
 */
module.exports = function (babel) {
    var t = babel.types;
    return {
        visitor: {
            ArrayExpression: function (path) {
                path.replaceWith(
                    t.callExpression(
                        t.memberExpression(t.identifier('wrapper'), t.identifier('array')),
                        path.node.elements
                    )
                );
            }
        }
    };
};