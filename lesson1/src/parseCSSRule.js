/**
 * 解析css规则
 * \s空白字符
 * \S非空白字符
 * +至少一次， * 0次或多次， ？0或1次
 * +？ *？ 最小匹配模式，偷懒模式
 * + * 默认是贪婪模式
 * （）匹配提取
 *  i = ignore case, g = global
 * cssrules = [{
 *   "selector": ".foo",
 *   "style": {
 *     "color": "red"
 *   },
 *   "cssText": ""
 * }]
 */
let cssGramaRule = /([\s\S]+?)\{([\s\S]*?)\s*?\}/gi

let css = `
  .foo {
    color: red;
    left: 10px;
  }
  
  body {
    background: orange;
  }
`

css = css.replace(/[\n\s]/g, "");

// console.log(cssGramaRule.exec(css))

let matchRule = {};
let rules = [];
while ((matchRule = cssGramaRule.exec(css))) {
  // console.log(matchRule)
  rules.push({
    selector: matchRule[1],
    style: parseProperty(matchRule[2]),
    cssText: matchRule[0]
  })
}
console.log(rules)

function parseProperty(expr) {
  let exprList = expr.split(";")
  let result = {}
  exprList.forEach(function (item) {
    if (item.match(":")) {
      let kv = item.split(":");
      result[kv[0]] = kv[1];
    }
  })
  return result;
}
