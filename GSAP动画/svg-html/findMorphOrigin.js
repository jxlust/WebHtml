/*
This function helps visualize the morph's origin (only for type:"rotational" morphs).
Simply pass in the the two targets (the starting SVG element and ending SVG element)
and it'll morph them, adding a red circle to show the origin. You can drag it around and once
you release it, you'll see the animation updated accordingly. If you drag it when the shape
is in its "end" state, it'll update the end origin. Drag in its "start" state and it'll
update the start origin.

Example:
findMorphOrigin(".start", ".end", {showLines:true});

Optionally pass in a vars object as the 3rd parameter with things like:
{showLines:true, scale:1.5, lineColor:"white", lineOpacity:0.5, lineWidth:1, origin:"40% 20%"}

Draggable is required (you can load it from the CDN at https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.0/utils/Draggable.min.js)
*/
function findMorphOrigin(target1, target2, vars) {
  vars = vars || {};
  gsap.killTweensOf(target1, false, { morphSVG: true });
  var _getElement = function (e) {
      return typeof e === "string" ? document.querySelector(e) : e;
    },
    _setDefaults = function (v, defaults) {
      v = v || {};
      for (var p in defaults) {
        if (!(p in v)) {
          v[p] = defaults[p];
        }
      }
      return v;
    },
    _createSVG = function (type, container, attributes) {
      var element = document.createElementNS(
          "http://www.w3.org/2000/svg",
          type
        ),
        reg = /([a-z])([A-Z])/g,
        p;
      for (p in attributes) {
        element.setAttributeNS(
          null,
          p.replace(reg, "$1-$2").toLowerCase(),
          attributes[p]
        );
      }
      container.appendChild(element);
      return element;
    },
    editing = "start",
    lines,
    startOrigin,
    endOrigin,
    _createLines = function () {
      var rawPath = startElement._gsRawPath,
        i,
        j,
        segment,
        line;
      lines = [];
      for (j = 0; j < rawPath.length; j++) {
        segment = rawPath[j];
        for (i = 0; i < segment.length; i += 6) {
          line = _createSVG("line", startElement.ownerSVGElement, {
            stroke: v.lineColor,
            strokeWidth: v.lineWidth,
          });
          line.style.opacity = v.lineOpacity;
          lines.push(line);
        }
        g.parentNode.appendChild(g);
      }
      return lines;
    },
    _update = function (leaveOrigin) {
      var rawPath = startElement._gsRawPath,
        li = 0,
        localToGlobal = globalG
          .getCTM()
          .inverse()
          .multiply(startElement.getCTM()),
        globalToLocal = localToGlobal.inverse(),
        o,
        j,
        i,
        sl,
        line,
        segment,
        ox,
        oy,
        x,
        y;
      if (rawPath && rawPath.origin) {
        if (leaveOrigin === true) {
          ox = gsap.getProperty(g, "x");
          oy = gsap.getProperty(g, "y");
        } else {
          o = rawPath.origin;
          ox = o.x * localToGlobal.a + o.y * localToGlobal.c + localToGlobal.e;
          oy = o.x * localToGlobal.b + o.y * localToGlobal.d + localToGlobal.f;
          gsap.set(g, { x: ox, y: oy });
        }
        if (v.showLines) {
          if (!lines) {
            _createLines();
          }
          for (j = 0; j < rawPath.length; j++) {
            segment = rawPath[j];
            sl = segment.length;
            for (i = 0; i < sl; i += 6) {
              line = lines[li++];
              line.setAttribute("x1", ox);
              line.setAttribute("y1", oy);
              line.setAttribute(
                "x2",
                segment[i] * localToGlobal.a +
                  segment[i + 1] * localToGlobal.c +
                  localToGlobal.e
              );
              line.setAttribute(
                "y2",
                segment[i] * localToGlobal.b +
                  segment[i + 1] * localToGlobal.d +
                  localToGlobal.f
              );
            }
          }
        }
        if (leaveOrigin === true) {
          x =
            (ox * globalToLocal.a +
              oy * globalToLocal.c +
              globalToLocal.e -
              rawPath.left) /
            rawPath.width;
          y =
            (ox * globalToLocal.c +
              oy * globalToLocal.d +
              globalToLocal.f -
              rawPath.top) /
            rawPath.height;
          if (editing === "start") {
            startOrigin =
              Math.round(x * 100) + "% " + Math.round(y * 100) + "%";
          } else {
            endOrigin = Math.round(x * 100) + "% " + Math.round(y * 100) + "%";
          }
          label.textContent = startOrigin + (endOrigin ? ", " + endOrigin : "");
        }
      }
    },
    startElement = _getElement(target1),
    v = _setDefaults(vars, {
      fill: "#0ae448",
      scale: 1,
      origin: "50% 50%",
      lineColor: "white",
      lineWidth: 0.5,
      lineOpacity: 0.35,
      duration: 2.25,
      ease: "power1.inOut",
      draggable: true,
    }),
    globalG = _createSVG("g", startElement.ownerSVGElement), //Firefox returns null for ownerSVGElement.getCTM(), so we need a dummy element
    labelG = _createSVG("g", startElement.ownerSVGElement),
    rect = _createSVG("rect", labelG, { width: 120, height: 17 }),
    label = _createSVG("text", labelG, { textAnchor: "middle" }),
    g = _createSVG("g", startElement.ownerSVGElement),
    clickArea = _createSVG("circle", g, { r: 20, style: "fill:transparent" }),
    origin = _createSVG("circle", g, {
      r: 4,
      style: "fill:" + v.fill + ";stroke:" + v.lineColor,
    }),
    tween = gsap.to(target1, {
      duration: v.duration,
      morphSVG: {
        shape: target2,
        type: "rotational",
        origin: v.origin,
        smoothTolerance: v.smoothTolerance,
      },
      onUpdate: _update,
      ease: v.ease,
    }),
    bbox = startElement.getBBox(),
    globalToLocal = globalG
      .getCTM()
      .inverse()
      .multiply(startElement.getCTM())
      .inverse(),
    localToGlobal = globalG.getCTM().inverse().multiply(startElement.getCTM()),
    tl = gsap.timeline({ yoyo: true, repeat: -1, repeatDelay: 1.25 }),
    rawPath;

  gsap.set(rect, { y: -17, x: -60, fill: "black", opacity: 0.4 });
  gsap.set(label, { y: -5, fontSize: 10, fill: "white" });
  gsap.set([g, labelG], { scale: v.scale, svgOrigin: "0 0" });
  gsap.set(labelG, {
    x: bbox.x + bbox.width / 2 + localToGlobal.e,
    y: bbox.y + bbox.height + localToGlobal.f,
  });
  tl.add(tween, 0).to(
    origin,
    { duration: v.duration, fill: "#f1004c", ease: "steps(1)" },
    0
  );
  tl.time(0.0001);
  rawPath = startElement._gsRawPath;
  if (!rawPath || !rawPath.origin) {
    throw "Please update to the latest MorphSVGPlugin";
  }
  if (v.origin.indexOf(",") !== -1) {
    endOrigin = v.origin.split(",")[1];
  }
  _update();
  _update(true);
  if (typeof Draggable !== "undefined") {
    Draggable.create(g, {
      onPress: function () {
        if (tl.pause().progress() < 0.5) {
          editing = "start";
          tl.progress(0.0001);
        } else {
          editing = "end";
          tl.progress(0.99999);
        }
        MorphSVGPlugin.getTotalSize(startElement._gsRawPath); //re-calculates the top/left/width/height and attaches those to the rawPath.
        gsap.set(g, { x: this.x, y: this.y });
        _update(true);
      },
      onDrag: function () {
        _update(true);
      },
      onRelease: function () {
        var time = tl.time(); //globalToLocal = startElement.ownerSVGElement.getCTM().inverse().multiply(startElement.getCTM()).inverse()
        tween.vars.morphSVG.origin =
          startOrigin + (endOrigin ? "," + endOrigin : "");
        tl.totalTime(0)
          .invalidate()
          .play(time > 0.001 ? time + 1.25 : 0);
      },
    });
  } else {
    console.log("Please load Draggable for findMorphOrigin() to work.");
  }
  return tl;
}
