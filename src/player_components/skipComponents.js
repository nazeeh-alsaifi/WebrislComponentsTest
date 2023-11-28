import videojs from "video.js";
let VjsButton = videojs.getComponent("Button");

//==================== BUTTONS =============
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
    console.log("=======================================================");

    this.player_.pause();
    const now = this.player_.currentTime();
    // const indicator = +(now % 0.04).toFixed(6);
    const indicator = this.floatSafeRemainder(now, 0.04);
    const frameTime = 1 / this.options.fps;

    console.log("indicator", indicator);
    if (indicator != 0) {
      const sub = +(now - indicator).toFixed(4);
      console.log("sub", sub);

      const increment = +(sub + frameTime).toFixed(4);
      console.log("increment", increment);

      this.player_.currentTime(increment);
      console.log("currenttime", this.player_.currentTime());
      //------------ hot fix of bug found in currentTime() function
      //------- need further improvment
      if (this.floatSafeRemainder(this.player_.currentTime(), 0.04) != 0) {
        this.player_.currentTime(this.player_.currentTime() + 0.00001);
      }
    } else {
      const increment = (now + frameTime).toFixed(4);
      console.log("increment", increment);

      this.player_.currentTime(increment);
      console.log("currenttime", this.player_.currentTime());
    }
    console.log("clicked button", frameTime);
    console.log("=======================================================");
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
    console.log("=======================================================");

    this.player.pause();
    const now = this.player.currentTime();
    const indicator = this.floatSafeRemainder(now, 0.04);
    const frameTime = 1 / this.options.fps;
    if (indicator != 0) {
      const sub = +(now - indicator).toFixed(4);
      console.log("sub", sub);

      const decrement = sub;
      console.log("decrement", decrement);

      this.player.currentTime(decrement);
      console.log("currenttime", this.player_.currentTime());
    } else {
      const decrement = (now - frameTime).toFixed(4);
      console.log("decrement", decrement);

      this.player.currentTime(decrement);
      console.log("currenttime", this.player_.currentTime());
    }

    console.log("frameTime", frameTime);
    console.log("=======================================================");
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
