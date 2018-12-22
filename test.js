var parse = require('./index')

var testCases = [
  "零",
  0,
  "十二点五六",
  12.56,
  "两万三",
  23000,
  "两万三千五",
  23500,
  "二十万",
  200000,
  "十四万零一十一",
  140011,
  "十四万零十一",
  140011,
  "二十四万零七百二十一",
  240721,
  "三亿四千六百二十四万零七百二十一",
  346240721,
  "九千零七万一千九百九十二亿五千四百七十四万零九百九十一",
  9007199254740991,
  "一千零一",
  1001,
  "负零点零零一",
  -0.001,
  "叁點壹肆壹伍玖貳陸",
  3.1415926,
  "陸萬柒仟捌佰玖拾",
  67890,
  "壹仟〇贰",
  1002,
  "四分之三",
  0.75,
  "七又五分之二",
  7.4,
  "百分之一",
  0.01,
  "千分之二点五",
  0.0025,
  "负万分之八",
  -0.0008
]

var result = new Array(testCases.length);
console.time('Tested')
// for (var n=0;n<10000;n++) {
for (var i = 0; i < testCases.length; i += 2) {
  var s = testCases[i]
  var num = parse(s)
  // result[i] = num
  console.log(num == testCases[i + 1], s, num)
  // console.log("\n")
}
// }

console.log(isNaN(parse("!@#$%带有其他字符")), 'Test about NaN')

console.timeEnd('Tested')
// console.log('result:', result)
