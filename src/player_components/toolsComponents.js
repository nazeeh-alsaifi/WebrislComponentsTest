import videojs from "video.js";

let VjsButton = videojs.getComponent("Button");
let BaseComponent = videojs.getComponent("Component");

//==================== BUTTONS =============
class ToolsParentButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("Tools Parent Button");
    this.player = player;
    this.options = options;
    this.hidden = true;
    // videojs.dom.emptyEl(this.el());
  }
  buildCSSClass() {
    return `vjs-tools-parent-button`;
  }
  handleClick() {
    if (!this.hidden) {
      this.player.ToolsWrapper.ToolsToggler.hide();
      this.hidden = true;
    } else {
      this.player.ToolsWrapper.ToolsToggler.show();
      this.hidden = false;
    }
    console.log("tools parent clicked!!");
  }
}
class FirstToolButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("First Tool Button");
    this.player = player;
    this.options = options;
    this.hidden = true;
  }
  buildCSSClass() {
    return `vjs-first-tool-button`;
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.player.controlBar.SkipBackwardButton.hide();
    console.log("first tool clicked!!");
    if (!this.hidden) {
      this.player.ProtactorWrapper.hide();
      this.hidden = true;
    } else {
      this.player.ProtactorWrapper.show();
      this.hidden = false;
    }
  }
}

class SecondToolButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("Second Tool Button");
    this.player = player;
    this.options = options;
    // videojs.dom.emptyEl(this.el());
    this.hidden = true;
  }
  buildCSSClass() {
    return `vjs-second-tool-button`;
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.player.controlBar.SkipBackwardButton.hide();
    console.log("second tool clicked!!");
    if (!this.hidden) {
      this.player.RulerWrapper.hide();
      this.hidden = true;
    } else {
      this.player.RulerWrapper.show();
      this.hidden = false;
    }
  }
}
class TimerButton extends VjsButton {
  constructor(player, options) {
    super(player, options);
    this.controlText("add stop watch");
    this.player = player;
    this.options = options;
    this.hidden = true;
    // videojs.dom.emptyEl(this.el());
  }
  buildCSSClass() {
    return `vjs-timer-tool-button`;
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.player.controlBar.SkipBackwardButton.hide();
    if (!this.hidden) {
      this.player.TimerMoveable.hide();
      this.hidden = true;
    } else {
      this.player.TimerMoveable.show();
      this.hidden = false;
    }
    console.log("timer added!!");
  }
}

//======================= COMPONENTS ===============
class ToolsWrapper extends BaseComponent {
  constructor(player, options) {
    super(player, options);
  }
  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-tools-wrapper",
    });
  }
}
class ToolsToggler extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();
  }
  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-tools-toggler",
    });
  }
}
export {
  ToolsParentButton,
  FirstToolButton,
  SecondToolButton,
  TimerButton,
  ToolsWrapper,
  ToolsToggler,
};
