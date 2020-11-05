import videojs from "video.js";
import { NewTimeDisplay, NewFrameDisplay } from "./utils/time-display.js";

let BaseComponent = videojs.getComponent("Component");
let VjsButton = videojs.getComponent("Button");

//======================= COMPONENTS ===============
class TimerMoveable extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();

    // this.on(this.el_.ownerDocument, "mousedown", this.startMoving);
    // this.on(this.el_.ownerDocument, "mouseup", this.stopMoving);
  }

  createEl() {
    return videojs.dom.createEl("div", {
      className:
        "vjs-timer-moveable draggable vjs-layout-tiny vjs-layout-x-small vjs-layout-small	vjs-layout-medium vjs-layout-large vjs-layout-x-large vjs-layout-huge",
    });
  }

  //====================js fiddle:http://jsfiddle.net/manojmcet/XXTQd/

  // startMoving(e) {
  //   console.log("widthoffset", this.parentComponent_.el_.offsetWidth);
  //   // this.el_.style.left =
  //   //   Math.floor(this.parentComponent_.el_.offsetWidth * 0.5) + "px";
  //   // this.el_.style.top =
  //   //   Math.floor(this.parentComponent_.el_.offsetHeight * 0.5) + "px";
  //   e = e || window.event;
  //   this.posX = e.clientX;
  //   this.posY = e.clientY;
  //   this.divTop = this.el_.style.top.replace("px", "");
  //   this.divLeft = this.el_.style.left.replace("px", "");
  //   this.diffX = this.posX - this.divLeft;
  //   this.diffY = this.posY - this.divTop;
  //   this.on(this.el_.ownerDocument, "mousemove", this.mouseMove);
  /* 
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
    */
  // }

  // mouseMove(e) {
  //   e = e || window.event;
  //   this.posX = e.clientX;
  //   this.posY = e.clientY;
  //   this.aX = this.posX - this.diffX;
  //   this.aY = this.posY - this.diffY;
  //   this.bounWidth =
  //     this.parentComponent_.el_.offsetWidth - this.el_.offsetWidth;
  //   this.bounHeight =
  //     this.parentComponent_.el_.offsetHeight - this.el_.offsetHeight;
  //   // console.log(this.bounWidth);
  //   if (
  //     this.aX > 0 &&
  //     this.aX < this.bounWidth &&
  //     this.aY > 0 &&
  //     this.aY < this.bounHeight
  //   ) {
  //     this.move(this.el_, this.aX, this.aY);
  //   }
  //   // console.log(this.bounWidth);
  // }

  // move(div, xpos, ypos) {
  //   // console.log("1");

  //   div.style.left = xpos + "px";
  //   div.style.top = ypos + "px";
  // }

  // stopMoving() {
  //   this.off(this.el_.ownerDocument, "mousemove", this.mouseMove);
  // }
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
    this.resetTime = 0;
    this.on(player, "durationchange", this.updateContent);
    this.on(player, "ended", () => {
      this.resetTime = 0;
    });
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
    videojs.dom.appendContent(el, " s");
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
      time = this.player_.currentTime() - this.resetTime;
    } else {
      time = this.player_.currentTime() - this.resetTime;
    }

    this.updateTextNode_(time);
  }
}

class MyFrameDisplay extends NewFrameDisplay {
  constructor(player, options) {
    super(player, options);
    this.resetTime = 0;

    this.on(player, "durationchange", this.updateContent);
    this.on(player, "ended", () => {
      this.resetTime = 0;
    });
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
      time = (this.player_.currentTime() - this.resetTime) * this.options_.fps;
    } else {
      time = (this.player_.currentTime() - this.resetTime) * this.options_.fps;
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
class ResetTimer extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("Reset Button");

    // videojs.do.emptyEl(this.el());
  }
  buildCSSClass() {
    return `vjs-reset-timer`;
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.player_.pause();
    this.player_.TimerMoveable.TimerDetailsWrapper.TimerVideoDetails.MyTimeDisplay.resetTime = this.player_.currentTime();
    this.player_.TimerMoveable.TimerDetailsWrapper.TimerVideoDetails.MyTimeDisplay.updateContent();
    this.player_.TimerMoveable.TimerDetailsWrapper.TimerVideoDetails.MyFrameDisplay.resetTime = this.player_.currentTime();
    this.player_.TimerMoveable.TimerDetailsWrapper.TimerVideoDetails.MyFrameDisplay.updateContent();
  }
}
// TimerMoveable.prototype.options_ = {
//   children: {
//     TimerDetailsWrapper: {
//       children: {
//         TimerVideoDetails: {
//           children: {
//             MyTimeDisplay: true,
//             MyFrameDisplay: { fps: TimerMoveable.options_.fps },
//             MyFpsDisplay: { fps: TimerMoveable.options_.fps },
//           },
//         },
//         ResetTimer: true,
//       },
//     },
//   },
// };

// TimerDetailsWrapper.prototype.options_ = {
//   children: ["TimerVideoDetails"],
// };
// TimerDetailsWrapper.prototype.options_ = {
//   children: ["MyTimeDisplay", "MyFrameDisplay", "MyFpsDisplay"],
// };

export {
  TimerMoveable,
  TimerDetailsWrapper,
  MyTimeDisplay,
  TimerVideoDetails,
  MyFrameDisplay,
  MyFpsDisplay,
  ResetTimer,
};
