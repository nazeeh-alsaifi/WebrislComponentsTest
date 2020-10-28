import videojs from "video.js";
import { NewTimeDisplay, NewFrameDisplay } from "./utils/time-display.js";
// import document from "global/document";

// import { bind } from "./utils/fn";
// import { bind, throttle, UPDATE_REFRESH_INTERVAL } from "video.js/core.js";
// import * as core from "video.js/core.js";
// let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");
// let TimeDisplay = videojs.getComponent("TimeDisplay");
// let NewTimeDisplay = videojs.getComponent("NewTimeDisplay");

//==================== BUTTONS =============

//======================= COMPONENTS ===============
class TimerMoveable extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();
    // console.log(bind);
    // this.elementDrag = throttle(
    //   bind(this, this.elementDrag),
    //   UPDATE_REFRESH_INTERVAL
    // );
    // console.log("dom", videojs.dom);
    // console.log("fn", videojs);
    // this.parent = this.parentComponent_;
    // );
    //===========ENABLE ================
    // this.on("mousedown", this.dragMouseDown);
    // const ownerDoc = this.el_.ownerDocument;
    // this.on(ownerDoc, "mousedown", this.dragMouseDown);
    this.on(this.el_.ownerDocument, "mousedown", this.startMoving);
    this.on(this.el_.ownerDocument, "mouseup", this.stopMoving);
    console.log(this);
    // this.on("mouseup", this.startMoving);

    // this.el_.onmousedown = this.dragMouseDown;
    // this.dragItem = this.el_;
    // console.log("ownerDoc", ownerDoc);
    // console.log("this.el_", this.el_.offsetLeft);

    // console.log("this.parent", this.parentComponent_);
    // console.log("videojs", videojs.throttle);

    // const testRect = getBoundingClientRect(this.el_);
    // console.log("testRec", testRect);
    this.newX = 0;
    this.newY = 0;
    this.prevX = 0;
    this.prevY = 0;

    //=== jsfiddle
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-timer-moveable",
    });
  }
  /* 
  //================ w3school
  dragMouseDown(e) {
    // console.log("dragMouseDown", e);

    e = e || window.event;
    // e.preventDefault();
    // e.stopPropagation();

    // get the mouse cursor position at startup:
    this.prevX = e.clientX;
    this.prevY = e.clientY;
    console.log("top", this.el_.style.top);
    console.log("left", this.el_.style.left);

    this.on(this.el_.ownerDocument, "mouseup", this.closeDragElement);
    // call a function whenever the cursor moves:
    this.on(this.el_.ownerDocument, "mousemove", this.elementDrag);
  }

  elementDrag(e) {
    // console.log("elementDrag", e);
    // console.log("this.el_", this.el_.offsetLeft);

    e = e || window.event;
    // e.preventDefault();
    // e.stopPropagation();

    // calculate the new cursor position:
    this.newX = this.prevX - e.clientX;
    this.newY = this.prevY - e.clientY;

    this.prevX = e.clientX;
    this.prevY = e.clientY;

    // set the element's new position:
    this.el_.style.top = this.el_.offsetTop - this.newY + "px";
    this.el_.style.left = this.el_.offsetLeft - this.newX + "px";
  }

  closeDragElement() {
    // e.preventDefault();
    // e.stopPropagation();

    // stop moving when mouse button is released:
    // console.log("closeDragElement", e);
    this.off(this.el_.ownerDocument, "mouseup", this.closeDragElement);
    this.off(this.el_.ownerDocument, "mousemove", this.elementDrag);
  }
 */
  //====================js fiddle:http://jsfiddle.net/manojmcet/XXTQd/

  startMoving(e) {
    e = e || window.event;
    this.posX = e.clientX;
    this.posY = e.clientY;
    this.divTop = this.el_.style.top.replace("px", "");
    this.divLeft = this.el_.style.left.replace("px", "");
    this.diffX = this.posX - this.divLeft;
    this.diffY = this.posY - this.divTop;
    this.on(this.el_.ownerDocument, "mousemove", this.mouseMove);
    console.log(
      "====================\n",
      "posx:",
      this.posX,
      "\nposy:",
      this.posY,
      "\ndivTop:",
      this.divTop,
      "\ndivLeft:",
      this.divLeft,
      "\ndiffX",
      this.diffX,
      "\ndiffY",
      this.diffY,
      "\n============================"
    );
  }

  mouseMove(e) {
    e = e || window.event;
    this.posX = e.clientX;
    this.posY = e.clientY;
    this.aX = this.posX - this.diffX;
    this.aY = this.posY - this.diffY;
    this.bounWidth =
      this.parentComponent_.el_.offsetWidth - this.el_.offsetWidth;
    this.bounHeight =
      this.parentComponent_.el_.offsetHeight - this.el_.offsetHeight;
    console.log(this.bounWidth);
    if (
      this.aX > 0 &&
      this.aX < this.bounWidth &&
      this.aY > 0 &&
      this.aY < this.bounHeight
    ) {
      this.move(this.el_, this.aX, this.aY);
    }
    // console.log(this.bounWidth);
  }

  move(div, xpos, ypos) {
    // console.log("1");

    div.style.left = xpos + "px";
    div.style.top = ypos + "px";
  }

  stopMoving() {
    this.off(this.el_.ownerDocument, "mousemove", this.mouseMove);
  }
}

class TimerDetailsWrapper extends BaseComponent {
  constructor(player, options) {
    super(player, options);

    // this.updateTextNode_();
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className: "p-flex p-items-center",
    });
  }
}
class TimerVideoDetails extends BaseComponent {
  constructor(player, options) {
    super(player, options);

    // this.updateTextNode_();
  }

  createEl() {
    const el = super.createEl("div", { className: "p-p-2" });
    // return videojs.dom.createEl("div", {
    //   className: "p-p-2",
    // });
    return el;
  }
}
class MyTimeDisplay extends NewTimeDisplay {
  constructor(player, options) {
    super(player, options);

    this.on(player, "durationchange", this.updateContent);
  }
  createEl() {
    //--------------------
    // const className = this.buildCSSClass();
    const el = videojs.dom.createEl("p", {
      className: `p-text-center p-whitespace-no-wrap`,
    });
    this.contentEl_ = videojs.dom.createEl(
      "span",
      {
        className: `p-font-mono`,
      },
      {
        // tell screen readers not to automatically read the time as it changes
        "aria-live": "off",
        // span elements have no implicit role, but some screen readers (notably VoiceOver)
        // treat them as a break between items in the DOM when using arrow keys
        // (or left-to-right swipes on iOS) to read contents of a page. Using
        // role='presentation' causes VoiceOver to NOT treat this span as a break.
        role: "presentation",
      }
    );
    el.appendChild(this.contentEl_);
    videojs.dom.appendContent(el, " S");
    // el.innerHTML("s");
    return el;
  }

  updateContent() {
    if (typeof this.player_.duration() !== "number") {
      return;
    }

    let time;

    // @deprecated We should only use remainingTimeDisplay
    // as of video.js 7
    if (this.player_.currentTime) {
      time = this.player_.currentTime();
    } else {
      time = this.player_.currentTime();
    }

    this.updateTextNode_(time);
  }
}

class MyFrameDisplay extends NewFrameDisplay {
  constructor(player, options) {
    super(player, options);
    this.on(player, "durationchange", this.updateContent);
  }
  createEl() {
    //--------------------
    // const className = this.buildCSSClass();
    const el = videojs.dom.createEl("p", {
      className: `p-text-center p-whitespace-no-wrap`,
      innerHTML: `Frame `,
    });
    this.contentEl_ = videojs.dom.createEl(
      "span",
      {
        className: `p-font-mono`,
      },
      {
        // tell screen readers not to automatically read the time as it changes
        "aria-live": "off",
        // span elements have no implicit role, but some screen readers (notably VoiceOver)
        // treat them as a break between items in the DOM when using arrow keys
        // (or left-to-right swipes on iOS) to read contents of a page. Using
        // role='presentation' causes VoiceOver to NOT treat this span as a break.
        role: "presentation",
      }
    );
    el.appendChild(this.contentEl_);
    // el.innerHTML("s");
    return el;
  }

  updateContent() {
    if (typeof this.player_.duration() !== "number") {
      return;
    }

    let time;

    // @deprecated We should only use remainingTimeDisplay
    // as of video.js 7
    if (this.player_.currentTime) {
      time = this.player_.currentTime() * this.options_.fps;
    } else {
      time = this.player_.currentTime() * this.options_.fps;
    }

    this.updateTextNode_(time);
  }
}

class MyFpsDisplay extends BaseComponent {
  constructor(player, options) {
    super(player, options);
  }
  createEl() {
    const el = videojs.dom.createEl("p", {
      className: `p-text-center p-whitespace-no-wrap`,
    });
    this.contentEl_ = videojs.dom.createEl("span", {
      className: `p-font-mono`,
      innerHTML: this.options_.fps + ` fps`,
    });
    el.appendChild(this.contentEl_);
    // el.innerHTML("s");
    return el;
  }
}

export {
  TimerMoveable,
  TimerDetailsWrapper,
  MyTimeDisplay,
  TimerVideoDetails,
  MyFrameDisplay,
  MyFpsDisplay,
};
