import videojs from "video.js";
let BaseComponent = videojs.getComponent("Component");

class BottomSheet extends BaseComponent {
  createEl() {
    return super.createEl("div", {
      className: "vjs-bottom-sheet",
      id: "secondary-toolbar",
    });
  }
}
export { BottomSheet };
