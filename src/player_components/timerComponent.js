import videojs from "video.js";

let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");

//==================== BUTTONS =============

//======================= COMPONENTS ===============
class TimerMoveable extends BaseComponent {
  constructor(player, options) {
    super(player, options);
  }
  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-timer-movable",
    });
  }
}

export { TimerMoveable };
