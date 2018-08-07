/**
 * 解析css规则
 * \s空白字符
 * \S非空白字符
 * +至少一次， * 0次或多次， ？0或1次
 * +？ *？ 最小匹配模式，偷懒模式
 * + * 默认是贪婪模式
 * （）匹配提取
 *  i = ignore case, g = global
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

let matchRule = {}
while ((matchRule = cssGramaRule.exec(css))) {
  console.log(matchRule)

}
