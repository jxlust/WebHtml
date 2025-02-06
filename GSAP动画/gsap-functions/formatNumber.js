// adds commas and forces 2 decimal places.
function formatNumber(value, decimals) {
  let s = (+value).toLocaleString("en-US").split(".");
  return decimals
    ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals)
    : s[0];
}

/**
 * 
 * eg 
 * let obj = { num: 100 };
gsap.to(obj, {
num: 10500,
onUpdate: () => (myElement.innerText = "$" + formatNumber(obj.num, 2)),
});
 * @param {*} increment 
 * @param {*} pad 
 * @returns 
 */

function getFormatter(increment, pad) {
  let snap = gsap.utils.snap(increment),
    exp = /\B(?=(\d{3})+(?!\d))/g,
    snapWithCommas = value => (snap(+value) + "").replace(exp, ","),
    whole = increment % 1 === 0,
    decimals = whole ? 0 : ((increment + "").split(".")[1] || "0").length;
  return !pad || whole ? snapWithCommas : value => {
    let s = snapWithCommas(value),
      i = s.indexOf(".");
    ~i || (i = s.length);
    return s.substr(0, i) + "." + (s.substr(i + 1, s.length - i - 1) + "00000000").substr(0, decimals);
  };
}

// let formatter = getFormatter(0.01, true); // increment by 0.01, always pad so that there are 2 decimal places

// console.log(formatter(5000.1)); // 5,000.10