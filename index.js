const stdNums = {一: 1, 壹: 1, 乙: 1, 二: 2, 贰: 2, 貳: 2, 两: 2, 兩: 2, 三: 3, 叁: 3, 叄: 3, 四: 4, 肆: 4, 五: 5, 伍: 5, 六: 6, 陆: 6, 陸: 6, 七: 7, 柒: 7, 八: 8, 捌: 8, 九: 9, 玖: 9}
var emptySlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Large enough to hold 9007199254740991

module.exports = function parse(str) {
  var slots = emptySlots.slice()
  var l = slots.length
  var p = l - 1
  var dot = 0
  var np = 1
  var w = 0, y = 0
  var f = null
  var den = null
  for (var i = str.length - 1; i >= 0; i = i - 1) {
    var char = str[i]
    var n = 0
    switch (char) {
      case "零":
      case "〇":
      case "另":
        p--
        continue
      case "十":
      case "拾":
        n = 1
        break
      case "百":
      case "佰":
      case "陌":
        n = 2
        break
      case "千":
      case "仟":
        n = 3;
        break
      case "万":
      case "萬":
        n = 4
        w++
        break
      case "亿":
      case "億":
        n = 8
        y++
        w--
        break
      case "点":
      case "點":
        if (dot !== 0) return NaN
        dot = l - p
        slots[p] = '.'
        p = p - 1
        continue
      case "负":
      case "負":
        np = np * -1 // 负负得正
        continue
      case "分":
      case "之":
        if (f === null) {
          f = Number(slots.join(''))
          p = l - 1
          slots = emptySlots.slice()
          dot = 0
        }
        continue
      case "又":
        if (den === null) {
          den = Number(slots.join(''))
          p = l - 1
          slots = emptySlots.slice()
          dot = 0
        } else return NaN
        continue
      default:
        if (p < 0) return NaN // Too large
        const d = stdNums[char]
        if (typeof d === 'undefined') return NaN
        slots[p] = d
        p = p - 1
        continue
    }

    if (p === l - 2 && slots[p] !== 1) {
      dot = 1 - n
    } else {
      p = l - 1 - (n > 3 ? 0 : n) - dot - w * 4 - y * 8
    }

    if (n === 1 || f !== null) {
      slots[p] = 1
    }
  }
  var value = Number(slots.join(''))
  if (f !== null) {
    value = den === null ? f / value : value + f / den
  }
  return dot < 0 ? np * value * (10 ** (-1 * dot)): np * value
}
