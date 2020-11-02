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
      className: "vjs-ruler-wrapper draggable",
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

export { RulerWrapper };
