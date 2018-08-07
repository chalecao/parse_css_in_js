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

let css = `
  .foo {
    color: red;
    left: 10px;
  }
  
  body {
    background: orange;
  }

  @media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
  }
`
// console.log(css)

css = css.replace(/[\n\s]{2,}/g, "");

// console.log(css)
// console.log(css.match(cssGramaRule))

/**
 * 获取匹配的rules
 * @param {*} cssTxt 
 */
function getMatchedRules(cssTxt) {
  let cssGramaRule = /([\s\S]+?)\{([\s\S]*?)\s*?\}/gi
  let matchRule = {};
  let rules = [];
  while ((matchRule = cssGramaRule.exec(cssTxt))) {
    
    if (matchRule[1].match("@")) {
      let styleTxt = matchRule[2].trim() + "}";
      rule = {
        selectorText: matchRule[1],
        type: "media",
        subStyles: getMatchedRules(styleTxt)
      };
      rules.push(rule);
    } else {
      rules.push({
        selector: matchRule[1],
        style: parseProperty(matchRule[2]),
        cssText: matchRule[0]
      })
    }
  }
  return rules
}

/**
 * 提取属性
 * @param {*} expr = color: red;left: 10px;
 */
function parseProperty(expr) {
  let exprList = expr.split(";")
  let result = {}
  exprList.forEach(function (item) {
    if (item.match(":")) {
      let kv = item.split(":");
      result[kv[0].trim()] = kv[1].trim();
    }
  })
  return result;
}

console.log(JSON.stringify(getMatchedRules(css), null, 4))
