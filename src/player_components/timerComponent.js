import videojs from "video.js";
// import formatTime from "@/player_components/utils/format-time.js";
// import document from "global/document";

// import { bind } from "./utils/fn";
// import { bind, throttle, UPDATE_REFRESH_INTERVAL } from "video.js/core.js";
// import * as core from "video.js/core.js";
// let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");
let TimeDisplay = videojs.getComponent("TimeDisplay");
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
    this.parent = this.parentComponent_;
    // );
    //===========ENABLE ================
    // this.on("mousedown", this.dragMouseDown);
    const ownerDoc = this.el_.ownerDocument;
    this.on(ownerDoc, "mousedown", this.dragMouseDown);
    // this.el_.onmousedown = this.dragMouseDown;
    // this.dragItem = this.el_;
    console.log("ownerDoc", ownerDoc);
    console.log("this.el_", this.el_.offsetLeft);

    console.log("this.parent", this.parentComponent_);
    // console.log("videojs", videojs.throttle);

    // const testRect = getBoundingClientRect(this.el_);
    // console.log("testRec", testRect);
    this.newX = 0;
    this.newY = 0;
    this.prevX = 0;
    this.prevY = 0;
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-timer-moveable",
    });
  }

  //================ w3school

  dragMouseDown(e) {
    // console.log("dragMouseDown", e);

    e = e || window.event;
    // e.preventDefault();
    // e.stopPropagation();

    // get the mouse cursor position at startup:
    this.prevX = e.clientX;
    this.prevY = e.clientY;
    this.on(this.el_.ownerDocument, "mouseup", this.closeDragElement);
    // call a function whenever the cursor moves:
    this.on(this.el_.ownerDocument, "mousemove", this.elementDrag);
  }

  elementDrag(e) {
    // console.log("elementDrag", e);
    console.log("this.el_", this.el_.offsetLeft);

    e = e || window.event;
    // e.preventDefault();
    // e.stopPropagation();

    // calculate the new cursor position:
    this.newX = this.prevX - e.clientX;
    this.newY = this.prevY - e.clientY;

    this.prevX = e.clientX;
    this.prevY = e.clientY;

    // console.log("pageX:", e.pageX);
    // console.log("pageY:", e.pageY);
    // console.log("clientX:", e.clientX);
    // console.log("pageY:", e.clientY);

    /* left/write contraint */
    // var offseX
    // if (e.clientX - this.prevX < 0) {
    //   offsetX = 0;
    // } else if (
    //   e.clientX - this.prevX + 102 >
    //   this.el_.ownerDocument.body.clientWidth
    // ) {
    //   offsetX = this.el_.ownerDocument.body.clientWidth.body.clientWidth - 102;
    // } else {
    //   offsetX = e.clientX - this.prevX;
    // }

    // /*   top/bottom constraint */
    // if (e.pageY - dragoffset.y < 0) {
    //   offsetY = 0;
    // } else if (e.pageY - dragoffset.y + 102 > document.body.clientHeight) {
    //   offsetY = document.body.clientHeight - 102;
    // } else {
    //   offsetY = e.pageY - dragoffset.y;
    // }
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

  //====================js fiddle
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
class MyTimeDisplay extends TimeDisplay {
  constructor(player, options) {
    super(player, options);
    this.on(player, "durationchange", this.updateContent);
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

export { TimerMoveable, TimerDetailsWrapper, MyTimeDisplay };
