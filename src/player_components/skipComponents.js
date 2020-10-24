import videojs from "video.js";

//==================== BUTTONS =============
let VjsButton = videojs.getComponent("Button");

//--------------- skip forward button -----------------------
class SkipForwardButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("Next");
    this.options = options;
    this.player = player;
  }
  buildCSSClass() {
    return `vjs-skip-forward-item ${super.buildCSSClass()}`;
  }

  handleClick() {
    this.player.pause();
    const now = this.player.currentTime();
    // const indicator = +(now % 0.04).toFixed(6);
    const indicator = this.floatSafeRemainder(now, 0.04);
    const frameTime = 1 / this.options.fps;

    console.log("indicator", indicator);
    if (indicator != 0) {
      const sub = +(now - indicator).toFixed(2);
      const increment = +(sub + frameTime).toFixed(6);
      this.player.currentTime(increment);

      console.log("sub", now - indicator);
    } else {
      const increment = +(now + frameTime).toFixed(6);
      this.player.currentTime(increment);
    }
    console.log("clicked button", frameTime);
  }

  floatSafeRemainder(val, step) {
    var valDecCount = (val.toString().split(".")[1] || "").length;
    var stepDecCount = (step.toString().split(".")[1] || "").length;
    var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    var valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    var stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
  }
}
class SkipBackwardButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("Next");
    this.options = options;
    this.player = player;
  }

  buildCSSClass() {
    return `vjs-skip-backward-item ${super.buildCSSClass()}`;
  }
  handleClick() {
    this.player.pause();
    const now = this.player.currentTime();
    const indicator = this.floatSafeRemainder(now, 0.04);
    const frameTime = 1 / this.options.fps;
    if (indicator != 0) {
      const sub = +(now - indicator).toFixed(2);
      const decrement = sub;
      this.player.currentTime(decrement);

      console.log("sub", now - indicator);
    } else {
      const decrement = (now - frameTime).toFixed(6);
      this.player.currentTime(decrement);
    }

    console.log("clicked button", frameTime);
  }
  floatSafeRemainder(val, step) {
    var valDecCount = (val.toString().split(".")[1] || "").length;
    var stepDecCount = (step.toString().split(".")[1] || "").length;
    var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    var valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    var stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
  }
}
export { SkipForwardButton, SkipBackwardButton };
