gsap.to("#box", {
    duration: 3,
    delay: 2,
    scale: 0.5,
    transformOrigin: "right bottom",
    ease: "sine.out",
    onComplete: anim_completed
  });
  
  function anim_completed() {
    smoothOriginChange("#box", "left top");
    gsap.to("#box", { duration: 3, scale: 1 });
    
    
    // ignore following line - just moving the white dot for demo purposes
    gsap.set("#origin", { y: -165, x: -165});
  }
  
  function smoothOriginChange(element, transformOrigin) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    var before = element.getBoundingClientRect();
    element.style.transformOrigin = transformOrigin;
    var after = element.getBoundingClientRect();
    gsap.set(element, {
      x: "+=" + (before.left - after.left),
      y: "+=" + (before.top - after.top)
    });
  }