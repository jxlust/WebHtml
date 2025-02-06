/*
如果您需要在动画开始时使用一种缓动，并在动画结束时使用另一种缓动，则可以使用此功能将它们混合！
Blend 2 eases together easily. Just copy the blendEases() function 
into your project and feed in the start and end eases into that 
function and it'll spit back a new blended ease that you pass 
into your tween. 

In the demo, the blue line is the starting ease, the red line
is the ending ease, and the big green one is the blended result.
For an advanced version that lets you control where the blending begins
(like halfway through), see https://codepen.io/GreenSock/pen/vYJWPQj
*/
function blendEases(startEase, endEase, blender) {
    var s = gsap.parseEase(startEase),
        e = gsap.parseEase(endEase),
        blender = gsap.parseEase(blender || "power3.inOut");
    return function (v) {
        var b = blender(v);
        return s(v) * (1 - b) + e(v) * b;
    };
}

