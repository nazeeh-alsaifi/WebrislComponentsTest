import videojs from "video.js";
// import { bind } from "./utils/fn";
// import { bind, throttle, UPDATE_REFRESH_INTERVAL } from "video.js/core.js";

// let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");

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

    // );
    //===========ENABLE ================
    // this.on("mousedown", this.dragMouseDown);
    this.on(["mousedown", "touchstart"], this.dragMouseDown);
    // this.el_.onmousedown = this.dragMouseDown;
    this.dragItem = this.el_;
    console.log("drageItem", this.dragItem);

    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-timer-moveable",
    });
  }

  //================ w3school

  dragMouseDown(e) {
    console.log("dragMouseDown", e);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.on("mouseup", this.closeDragElement);
    // call a function whenever the cursor moves:
    this.on("mousemove", this.elementDrag);
  }

  elementDrag(e) {
    console.log("elementDrag", e);

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    this.el_.style.top = this.el_.offsetTop - this.pos2 + "px";
    this.el_.style.left = this.el_.offsetLeft - this.pos1 + "px";
  }

  closeDragElement(e) {
    // stop moving when mouse button is released:
    console.log("closeDragElement", e);
    this.off("mouseup", this.closeDragElement);
    this.off("mousemove", this.elementDrag);
  }
}

// class TimerDetails extends BaseComponent {}

export { TimerMoveable };
