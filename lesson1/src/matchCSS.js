/**
 * 匹配css规则
 * \s空白字符
 * \S非空白字符
 * +至少一次， * 0次或多次， ？0或1次
 * +？ *？ 最小匹配模式，偷懒模式
 * + * 默认是贪婪模式
 * （）匹配提取
 *  i = ignore case, g = global
 *  cmd + shift + b
 */
let cssGramaRule = /([\s\S]+?){([\s\S]*?)\s*?}/gi
let css = `
  .foo {
    color: red;
    left: 10px;
  }
  
  body {
    background: orange;
  }
`
css = css.replace(/[\n\s]/g,"");
console.log(css.match(cssGramaRule))