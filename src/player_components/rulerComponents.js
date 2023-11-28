import videojs from "video.js";
let BaseComponent = videojs.getComponent("Component");
// let VjsButton = videojs.getComponent("Button");

class RulerWrapper extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();
  }

  createEl() {
    const el = videojs.dom.createEl("div", {
      className:
        "vjs-ruler-wrapper draggable vjs-layout-tiny vjs-layout-x-small vjs-layout-small	vjs-layout-medium vjs-layout-large vjs-layout-x-large vjs-layout-huge",
    });
    this.buttonHandle_ = videojs.dom.createEl("div", {
      innerHTML: "&circlearrowright;",
      className: "rotation-handle",
    });
    this.imageEl_ = videojs.dom.createEl(
      "img",
      { className: "test" },
      { src: this.options_.src }
    );
    // return videojs.dom.createEl("div", { className: "vjs-ruler-wrapper" });
    el.appendChild(this.buttonHandle_);
    el.appendChild(this.imageEl_);
    return el;
  }
}

class ProtactorWrapper extends BaseComponent {
  constructor(player, options) {
    super(player, options);
    this.hide();
  }

  createEl() {
    const el = videojs.dom.createEl("div", {
      className:
        "vjs-ruler-wrapper draggable  vjs-layout-tiny vjs-layout-x-small vjs-layout-small	vjs-layout-medium vjs-layout-large vjs-layout-x-large vjs-layout-huge",
    });
    this.buttonHandle_ = videojs.dom.createEl("div", {
      innerHTML: "&circlearrowright;",
      className: "rotation-handle",
    });
    this.imageEl_ = videojs.dom.createEl(
      "img",
      { className: "test" },
      { src: this.options_.src }
    );
    // return videojs.dom.createEl("div", { className: "vjs-ruler-wrapper" });
    el.appendChild(this.buttonHandle_);
    el.appendChild(this.imageEl_);
    return el;
  }
}

export { RulerWrapper, ProtactorWrapper };
