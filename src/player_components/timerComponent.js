import videojs from "video.js";
// import {bind, throttle, UPDATE_REFRESH_INTERVAL} from 'video.js';

// let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");

//==================== BUTTONS =============

//======================= COMPONENTS ===============
class TimerMoveable extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();

    // this.on("touchstart", this.dragStart);
    // this.on("touchend", this.dragEnd);
    // this.on("touchmove", this.drag);

    this.on("mousedown", this.test);
    // this.on("mouseup", this.dragEnd);
    // this.on("mousemove", this.drag);

    this.dragItem = document.getElementsByClassName("vjs-timer-moveable");
    console.log("drageItem", this.dragItem);
    this.active = false;
    this.initialX;
    this.initialY;
    this.currentX;
    this.currentY;
    this.xOffset = 0;
    this.yOffset = 0;
    // this.
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-timer-moveable",
    });
  }

  /* dragStart(e) {
    console.log("dragstart", e);
    if (e.type === "touchstart") {
      this.initialX = e.touches[0].clientX - this.xOffset;
      this.initialY = e.touches[0].clientY - this.yOffset;
    } else {
      this.initialX = e.clientX - this.xOffset;
      this.initialY = e.clientY - this.yOffset;
    }

    if (e.target === this.dragItem) {
      this.active = true;
    }
  }

  dragEnd() {
    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.active = false;
  }

  drag(e) {
    if (this.active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        this.currentX = e.touches[0].clientX - this.initialX;
        this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        this.currentX = e.clientX - this.initialX;
        this.currentY = e.clientY - this.initialY;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setTranslate(this.currentX, this.currentY, this.dragItem);
    }
  }

  setTranslate(xPos, yPos, el) {
    el[0].style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  } */
  test() {
    console.log("test", this.dragItem);
    this.dragItem[0].style.transform =
      "translate3d(" + 80 + "px, " + 60 + "px, 0)";
  }
}

export { TimerMoveable };
