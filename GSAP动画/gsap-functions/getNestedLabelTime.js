/**
 * 
 * 标签是特定于时间轴的，因此您无法指示时间轴将其播放头移动到嵌套时间轴中存在的标签。因此，这里有一个辅助函数，可让您找到嵌套标签并计算其在[父/祖先]时间轴上的位置：
 * 以下是一个用法示例：tl.seek(getNestedLabelTime(tl, "someNestedLabel"))
 * @param {*} timeline 
 * @param {*} label 
 * @returns 
 */
function getNestedLabelTime(timeline, label) {
  let children = timeline.getChildren(true, false, true),
    i = children.length,
    tl,
    time;
  while (i--) {
    if (label in children[i].labels) {
      tl = children[i];
      time = tl.labels[label];
      break;
    }
  }
  if (tl) {
    while (tl !== timeline) {
      time = tl.startTime() + time / tl.timeScale();
      tl = tl.parent;
    }
  }
  return time;
}

