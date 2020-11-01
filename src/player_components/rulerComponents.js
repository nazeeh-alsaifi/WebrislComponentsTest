import videojs from "video.js";
let BaseComponent = videojs.getComponent("Component");
// let VjsButton = videojs.getComponent("Button");

class RulerWrapper extends BaseComponent {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = videojs.dom.createEl("div", {
      className: "vjs-ruler-wrapper draggable",
    });
    this.imageEl_ = videojs.dom.createEl(
      "img",
      { className: "test" },
      { src: "https://www.w3schools.com/tags/img_girl.jpg" }
    );
    // return videojs.dom.createEl("div", { className: "vjs-ruler-wrapper" });
    el.appendChild(this.imageEl_);
    return el;
  }
}

export { RulerWrapper };
