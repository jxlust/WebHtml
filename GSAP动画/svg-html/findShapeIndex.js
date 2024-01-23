/*
    For use with GreenSock's MorphSVGPlugin - helps find the best-looking shapeIndex value.

    USAGE:
    findShapeIndex("#yourTarget", "#otherShape", {duration:3, ease:"none", size:10});

    You can pass in either the other shape's selector text, or the full path data, like:

    findShapeIndex("#yourTarget", "M506.066,200L400,306.066L293.934,200L400,93.934L506.066,200z", {duration:3, ease:"none", size:10});

    Tap the up/down arrows (or left/right or "u"/"d") to change the shapeIndex.

    Requires: GSAP 3.0.0 (or later), MorphSVGPlugin

    LAST UPDATED: 2019-11-10
    Copyright 2019, GreenSock Inc.
    @author: Jack Doyle, jack@greensock.com
    */

function findShapeIndex(target, endShape, vars) {
  vars = vars || {};
  var _doc = document,
    _get = function (e) {
      return _doc.querySelectorAll(e);
    },
    _createSVG = function (type, attributes) {
      var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
        reg = /([a-z])([A-Z])/g,
        p;
      for (p in attributes) {
        element.setAttributeNS(
          null,
          p.replace(reg, "$1-$2").toLowerCase(),
          attributes[p]
        );
      }
      return element;
    },
    _numExp = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
    _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/gi,
    _parseShape = (shape, forcePath, target) => {
      let isString = typeof shape === "string",
        e,
        type;
      if (
        !isString ||
        _selectorExp.test(shape) ||
        (shape.match(_numExp) || []).length < 3
      ) {
        e = gsap.utils.toArray(shape)[0];
        if (e) {
          type = (e.nodeName + "").toUpperCase();
          if (forcePath && type !== "PATH") {
            //if we were passed an element (or selector text for an element) that isn't a path, convert it.
            e = MorphSVGPlugin.convertToPath(e, false);
            type = "PATH";
          }
          shape = e.getAttribute(type === "PATH" ? "d" : "points") || "";
          if (e === target) {
            //if the shape matches the target element, the user wants to revert to the original which should have been stored in the data-original attribute
            shape = e.getAttributeNS(null, "data-original") || shape;
          }
        } else {
          console.warn("Invalid morph to: " + shape);
          shape = false;
        }
      }
      return shape;
    },
    startDot,
    endDot,
    incrementButton,
    decrementButton,
    _setup = function () {
      var e = _doc.createElement("div"),
        label = _doc.createElement("div"),
        body = _get("body")[0];
      incrementButton = _doc.createElement("div");
      decrementButton = _doc.createElement("div");
      label.setAttribute("id", "shapeIndexLabel");
      startDot = _createSVG("circle", {
        cx: 0,
        cy: 0,
        r: (vars.startStrokeWidth || 3) + 3,
        fill: vars.startStroke || "red",
      });
      endDot = _createSVG("circle", {
        cx: 0,
        cy: 0,
        r: (vars.endStrokeWidth || 3) + 3,
        fill: vars.endStroke || "yellow",
      });
      gsap.set(e, {
        padding: "0px",
        position: "absolute",
        bottom: 0,
        fontSize: "20px",
        textAlign: "center",
        backgroundColor: "black",
        color: "#91e600",
        border: "1px solid #999",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        userSelect: "none",
        fontFamily: "sans-serif",
        zIndex: 100,
      });
      gsap.set(label, {
        display: "inline-block",
        minWidth: "210px",
        marginRight: "10px",
        textAlign: "center",
        marginLeft: "10px",
      });
      gsap.set([incrementButton, decrementButton], {
        display: "inline-block",
        padding: "0 15px",
        color: "#ccc",
        height: "50px",
        lineHeight: "48px",
        cursor: "pointer",
      });
      gsap.set(decrementButton, { borderRight: "1px solid #999" });
      gsap.set(incrementButton, { borderLeft: "1px solid #999" });
      decrementButton.innerHTML = " - ";
      incrementButton.innerHTML = " + ";
      e.appendChild(decrementButton);
      e.appendChild(label);
      e.appendChild(incrementButton);
      if (body) {
        body.appendChild(e);
      }
      return label;
    },
    label = _get("#shapeIndexLabel")[0] || _setup(),
    index = 0,
    _yoyo = function () {
      shapeTween.reversed(!shapeTween.reversed()).resume();
      dotTween.reversed(!dotTween.reversed()).resume();
    },
    shapeTween,
    dotTween,
    startBezier,
    endBezier,
    dotProxy = { x: 0, y: 0 },
    _getFirstCoordinates = function (start, end, shapeIndex) {
      startBezier = MorphSVGPlugin.stringToRawPath(start);
      endBezier = MorphSVGPlugin.stringToRawPath(end);

      MorphSVGPlugin.equalizeSegmentQuantity(
        startBezier,
        endBezier,
        shapeIndex
      );
      return [
        startBezier[0][0],
        startBezier[0][1],
        endBezier[0][0],
        endBezier[0][1],
      ];
    },
    _startTween = function () {
      var coordinates = _getFirstCoordinates(
        origStartShape,
        origEndShape,
        index
      );
      dotProxy.x = coordinates[0];
      dotProxy.y = coordinates[1];
      startDot.setAttribute("cx", dotProxy.x);
      startDot.setAttribute("cy", dotProxy.y);
      endDot.setAttribute("cx", coordinates[2]);
      endDot.setAttribute("cy", coordinates[3]);
      shapeTween = gsap.fromTo(
        target,
        { morphSVG: origStartShape },
        {
          delay: 0.5,
          duration: vars.duration || 3,
          morphSVG: { shape: origEndShape, shapeIndex: index },
          ease: vars.ease || "none",
          onComplete: _yoyo,
          onReverseComplete: _yoyo,
          overwrite: true,
        }
      );
      dotTween = gsap.to(dotProxy, {
        delay: 0.5,
        duration: vars.duration || 3,
        x: coordinates[2],
        y: coordinates[3],
        ease: vars.ease || "none",
        onUpdate: function () {
          startDot.setAttribute("cx", dotProxy.x);
          startDot.setAttribute("cy", dotProxy.y);
        },
      });
    },
    _refresh = function () {
      label.innerHTML =
        "shapeIndex: " + index + (index === autoIndex ? " (auto)" : "");
      shapeTween.seek(0).kill();
      dotTween.seek(0).kill();
      _startTween();
      gsap.fromTo(
        label.parentNode,
        0.4,
        { backgroundColor: "#777" },
        { backgroundColor: "black", ease: "none" }
      );
    },
    _increment = function () {
      index = (index + 1) % (maxIndex + 1);
      _refresh();
    },
    _decrement = function () {
      index = (index - 1) % (maxIndex + 1);
      _refresh();
    },
    autoIndex,
    maxIndex,
    endTarget;
  if (typeof target === "string") {
    target = gsap.utils.toArray(target)[0];
  }
  if (!target) {
    console.log(
      "ERROR: target not found for findShapeIndex(). Please use a valid target."
    );
    return;
  } else if (target.nodeName && target.nodeName.toUpperCase() !== "PATH") {
    console.log("ERROR: target of findShapeIndex() must be a path.");
    return;
  } else if (target.push && target[0] && target[0].nodeName) {
    target = target[0];
  }
  if (target.parentNode) {
    target.parentNode.appendChild(endDot);
    target.parentNode.appendChild(startDot);
  }
  if (
    typeof endShape !== "string" ||
    (endShape.match(_numExp) || []).length < 3
  ) {
    endTarget = gsap.utils.toArray(endShape);
    if (endTarget && endTarget[0]) {
      endTarget = endTarget[0];
      gsap.set(endTarget, {
        display: "block",
        strokeWidth: vars.endStrokeWidth || 3,
        stroke: vars.endStroke || "yellow",
        fill: vars.endFill || "none",
        visibility: "visible",
        opacity: vars.endOpacity || 0.7,
      });
    }
  }
  gsap.set(target, {
    display: "block",
    strokeWidth: vars.startStrokeWidth || 3,
    stroke: vars.startStroke || "red",
    fill: vars.startFill || "none",
    visibility: "visible",
    opacity: vars.startOpacity || 0.7,
  });
  startBezier = MorphSVGPlugin.stringToRawPath(target.getAttribute("d"));
  endBezier = MorphSVGPlugin.stringToRawPath(_parseShape(endShape, true));
  autoIndex = index = Math.round(
    MorphSVGPlugin.equalizeSegmentQuantity(startBezier, endBezier, "auto")[0]
  ); //also handles subdividing!
  maxIndex = (startBezier[0].length / 6) | 0;
  gsap.killTweensOf([target, endShape]); //kill other tweens so they don't interfere with our yoyo-ing one.

  const origStartShape = _parseShape(target, true);
  const origEndShape = _parseShape(endShape, true);
  _startTween();
  label.innerHTML =
    "shapeIndex: " + index + (index === autoIndex ? " (auto)" : "");
  window.addEventListener("keydown", function (event) {
    var key = event.keyCode;
    if (key === 38 || key === 39 || key === 85) {
      //right or up arrows (increment)
      _increment();
    } else if (key === 37 || key === 40 || key === 68) {
      //left or down arrows (decrement)
      _decrement();
    }
  });
  incrementButton.addEventListener("click", _increment);
  decrementButton.addEventListener("click", _decrement);
}
