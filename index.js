const slots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							
const l = slots.length
const digits = {一: 1, 壹: 1, 二: 2, 贰: 2, 三: 3, 叁: 3, 四: 4, 肆: 4, 五: 5, 伍: 5, 六: 6, 陆: 6, 七: 7, 柒: 7, 八: 8, 捌: 8, 九: 9, 玖: 9}
const str = "伍万肆仟叁佰贰拾壹"
// const str = "二千三百四十五万六千七百八十九亿八千七百六十五万四千三百二十一"

var p = l - 1

for (var i = str.length - 1; i >= 0; i = i - 1) {
  var char = str[i]
  // console.log("char:", char, "i:", i)

  var offset = Math.floor((l - 1 - p) / 4) * 4
  switch (char) {
    case "零":
      break
    case "十":
    case "拾":
      p = l - offset - 2
      slots[p] = 1
      break
    case "百":
    case "佰":
      p = l - offset - 3
      break
    case "千":
    case "仟":
      p = l - offset - 4
      break
    case "万":
      p = l - offset - 5
      break
    case "亿":
      p = l - Math.floor(offset / 2) - 7
      break
    default:
      slots[p] = digits[char]
  }

  // console.log(slots, p)
}

console.log(parseInt(slots.join('')))
