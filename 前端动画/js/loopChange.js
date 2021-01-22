class LoopChange {
    constructor(parentEl, maxCount, timeArray) {
        if (typeof parentEl === 'string') {
            this.parent = document.querySelector(parentEl)
        } else if (parentEl instanceof HTMLElement) {
            this.parent = parentEl;
        }
        this.maxCount = maxCount;
        this.duration = timeArray.length - 1 >= 0 ? timeArray[timeArray.length - 1] : 1000;
        this.optArray = timeArray;
        this.allChildEl = this.parent.children;

        this.lastChild = null;
        this.rAFId = null;

    }
    setActive(el) {
        if (el !== this.lastChild) {
            this.lastChild && this.lastChild.classList.remove('active');
            el.classList.add('active');
            this.lastChild = el
        }
    }
    cssAni(timestamp) {
        // 0 - 3000ms red
        // 3000ms - 4000ms yellow
        //4000ms - 6000ms green
        // console.log('this:',this);
        let isGoon = timestamp <= this.maxCount * this.duration;
        timestamp = timestamp % 6000;
        let index = this.optArray.findIndex(time => timestamp < time);
        this.setActive(this.allChildEl[index]);
        this.loop(isGoon);
    }
    loop(isGoon) {
        if (isGoon) {
            let context = this;
            this.rAFId = window.requestAnimationFrame(this.cssAni.bind(context))
        } else {
            window.cancelAnimationFrame(this.rAFId)
        }
    }
    startLoop() {
        this.loop(true)
    }

}