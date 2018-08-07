/**
 * 解析css规则 - handle keyframes
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
 * 
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

  @keyframes mymove { from {top:0px;} to {top:200px;} } 
  
  @-webkit-keyframes mymove { from {top:0px;} to {top:200px;} } 

  @font-face{font-family:"Roboto";src:url("//i.alicdn.com/artascope-font/20160419204543/font/roboto-thin.eot");} 
`
// console.log(css)

css = css.replace(/[\n\s]{2,}/g, "");

// console.log(css)
// console.log(css.match(cssGramaRule))
/**
 * 获取匹配的rules
 * @param {*} cssTxt 
 */
function getMatchedSpecialRules(_rule, type, cssTxt) {
  let cssGramaRule = _rule;
  let matchRule = {};
  let rules = [];
  while ((matchRule = cssGramaRule.exec(cssTxt))) {
    console.log(matchRule)
    if (matchRule[1].match("@")) {
      let styleTxt = matchRule[2].trim();
      console.log(styleTxt)
      rule = {
        selectorText: matchRule[1],
        type: type,
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

function getMatchedRules(cssTxt) {
  let cssGramaRule = /([\s\S]+?)\{([\s\S]*?)\s*?\}/gi
  let matchRule = {};
  let rules = [];
  while ((matchRule = cssGramaRule.exec(cssTxt))) {

    rules.push({
      selector: matchRule[1],
      style: parseProperty(matchRule[2]),
      cssText: matchRule[0]
    })

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

let mediaRule = /(@media[\s\S]*?){([\s\S]*?}\s*?)}/gi;
let keyframesRule = /(@[a-z\-]*?keyframes[\s\S]*?){([\s\S]*?}\s*?)}/gi;

let rules = [];
rules = rules.concat(getMatchedSpecialRules(mediaRule, "media", css))
css = css.replace(mediaRule, "")
rules = rules.concat(getMatchedSpecialRules(keyframesRule, "keyframes", css))
css = css.replace(keyframesRule, "")
rules = rules.concat(getMatchedRules(css))

console.log(rules)