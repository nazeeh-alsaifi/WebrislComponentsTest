<template>
  <div class="container mb-5 mt-5">
    <div id="video_player" class="interactive-player">
      <video
        ref="videoPlayer"
        class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered mb-2"
        :poster="getCurrentSource.poster"
      >
        <source :src="getCurrentSource.src" :type="getCurrentSource.type" />
      </video>
    </div>
    <div id="video_buttons">
      <button type="button" class="btn btn-success mr-2" @click="loadSource">
        change source
      </button>
    </div>
    <div class="container">
      <h4>currentTime: {{ playerCurrentTime }}</h4>
      <h4>duration: {{ playerDuration }}</h4>
      <!-- <h4>frame: {{ frameNum }}</h4> -->
      <h4>frame: {{ playerFrame }}</h4>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Video1V",
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: false,
          controls: true,
          // TitleBar: { text: {} },
          // ToolsParent: true,
          // ToolsParentButton: true,
          // FirstToolButton: true,
          ToolsWrapper: {
            children: {
              ToolsParentButton: true,
              ToolsToggler: {
                children: {
                  FirstToolButton: true,
                  SecondToolButton: true,
                },
              },
            },
          },
          /*
           ToolsParentClickableComp: {
            children: {
              FirstToolButton: true,
              SecondToolButton: true,
            },
          }, 
          */
          controlBar: {
            children: {
              SkipBackwardButton: { fps: 25 },
              playToggle: false,
              SkipForwardButton: { fps: 25 },
              CurrentTimeDisplay: true,
              ProgressControl: { liveui: true },
              RemainingTimeDisplay: true,
              FullscreenToggle: true,
            },
          },
        };
      },
    },
  },
  data() {
    return {
      player: null,
      // sources: {
      //   id: "video-1",
      //   src: "http://vjs.zencdn.net/v/oceans.mp4",
      //   poster: "http://vjs.zencdn.net/v/oceans.png",
      //   type: "video/mp4",
      //   dataSetup: "{}",
      // },
      // frameNum: -1,
    };
  },
  computed: {
    ...mapGetters(["getSources", "getCurrentSource"]),
    playerCurrentTime: function () {
      if (this.player !== null) {
        return +this.player.currentTime();
      }
      return 0;
    },
    playerDuration: function () {
      if (this.player !== null) {
        return this.player.duration();
      }
      return 0;
    },
    playerFrame: function () {
      if (this.player !== null) {
        return Math.floor(this.player.currentTime() * 25);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(["changeSource"]),
    loadSource() {
      // this.changeSource();
      this.player.src({
        src: require("@/assets/oceans.mp4"),
        type: "video/mp4",
      });
    },
    playerGetTime() {
      const now = this.player.currentTime();
      console.log(now);
    },
    // roundToTwo(num) {
    //   return Math.round((num + Number.EPSILON) * 100) / 100;
    // },
    // roundToFour(num) {
    //   return Math.round((num + Number.EPSILON) * 10000) / 10000;
    // },
    // increment() {
    //   this.frameNum += 1;
    // },
  },
  mounted() {
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
    // TODO : on hold DElETE ToolsParentButton
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
        // videojs.dom.emptyEl(this.el());
      }
      buildCSSClass() {
        return `vjs-first-tool-button`;
      }
      handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        // this.player.controlBar.SkipBackwardButton.hide();
        console.log("first tool clicked!!");
      }
    }
    class SecondToolButton extends VjsButton {
      constructor(player, options) {
        super(player, options);
        this.controlText("Second Tool Button");
        this.player = player;
        this.options = options;
        // videojs.dom.emptyEl(this.el());
      }
      buildCSSClass() {
        return `vjs-second-tool-button`;
      }
      handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        // this.player.controlBar.SkipBackwardButton.hide();
        console.log("second tool clicked!!");
      }
    }

    //=============== components =====================
    let BaseComponent = videojs.getComponent("Component");

    //--------------- title Bar -----------------------
    // Changing title bar to ES6 and remove deprecate
    class TitleBar extends BaseComponent {
      constructor(player, options) {
        super(player, options);
        if (options.text) {
          this.updateTextContent(options.text);
        }
      }
      createEl() {
        return videojs.dom.createEl("div", {
          className: "vjs-title-bar",
        });
      }
      updateTextContent(text) {
        if (typeof text !== "string") {
          text = "Title Unknown";
        }
        videojs.dom.emptyEl(this.el());
        videojs.dom.appendContent(this.el(), text);
      }
    }
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
    //---------------TODO:delete:tools parent -----------------------
    // class ToolsParent extends BaseComponent {
    //   constructor(player, options) {
    //     super(player, options);
    //   }
    //   createEl() {
    //     return videojs.dom.createEl("div", {
    //       className: "vjs-tools-parent",
    //     });
    //   }
    // }

    //================= Clickable Components ==============
    let ClickableComponent = videojs.getComponent("ClickableComponent");

    //-------------- tool parent as clicakble components
    class ToolsParentClickableComp extends ClickableComponent {
      constructor(player, options) {
        super(player, options);
        this.controlText("Tool parent clicable component");
        this.hidden = false;
      }
      buildCSSClass() {
        return `vjs-tools-parent-clickable-comp`;
      }
      createEl() {
        return super.createEl();
      }
      handleClick() {
        // event.preventDefault();
        // this.children(0)
        this.hideTools();
      }
      hideTools() {
        console.log(this.hidden);
        if (!this.hidden) {
          console.log("here");
          Array.prototype.forEach.call(this.children(), (child) => {
            child.hide();
          });
          // this.children()[0].hide();
          this.hidden = true;
        } else {
          // this.children()[0].show();
          Array.prototype.forEach.call(this.children(), (child) => {
            child.show();
          });
          this.hidden = false;
        }
        console.log(
          "Tool parent clickable component clicked!!",
          this.children().length
        );
      }
    }

    //============= Regestring componenets ==========
    //---- extend component
    videojs.registerComponent("TitleBar", TitleBar);
    videojs.registerComponent("ToolsWrapper", ToolsWrapper);
    videojs.registerComponent("ToolsToggler", ToolsToggler);
    // TODO:delete toolsparent
    // videojs.registerComponent("ToolsParent", ToolsParent);
    //---- extend button
    videojs.registerComponent("SkipForwardButton", SkipForwardButton);
    videojs.registerComponent("SkipBackwardButton", SkipBackwardButton);
    // TODO:ONHOLD:delete tools paert button
    videojs.registerComponent("ToolsParentButton", ToolsParentButton);
    videojs.registerComponent("FirstToolButton", FirstToolButton);
    videojs.registerComponent("SecondToolButton", SecondToolButton);

    //------ extend clickable component
    videojs.registerComponent(
      "ToolsParentClickableComp",
      ToolsParentClickableComp
    );

    //========= player ============
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style >
.video-js .vjs-skip-forward-item .vjs-icon-placeholder:before {
  content: "\f11f";
  font-family: "VideoJs";
}
.video-js .vjs-skip-backward-item .vjs-icon-placeholder:before {
  content: "\f120";
  font-family: "VideoJs";
}

.video-js .vjs-title-bar {
  background: rgba(0, 0, 0, 0.5);
  color: white;

  /*
    By default, do not show the title bar.
  */
  display: none;
  font-size: 2em;
  padding: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* 
  Only show the title bar after playback has begun (so as not to hide
  the big play button) and only when paused or when the user is 
  interacting with the player.
*/
.video-js.vjs-paused.vjs-has-started .vjs-title-bar,
.video-js.vjs-user-active.vjs-has-started .vjs-title-bar {
  display: block;
}

/* .vjs-tools-parent {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transform: (-50px, -50px);
} */
/* 

.video-js .vjs-tools-parent-clickable-comp {
  font-size: 3em;
  line-height: 1.5em;
  height: 2em;
  width: 2em;
  display: block;
  position: absolute;
  top: 2%;
  left: 90%;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2b333f;
  background-color: rgba(43, 51, 63, 0.7);
  border-radius: 50%;
  transition: all 0.4s;
}
.video-js .vjs-tools-parent-clickable-comp > .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f110";
}
.video-js .vjs-first-tool-button {
  line-height: 1.5em;
  height: 2em;
  width: 2em;
  display: block;
  position: absolute;
  top: 110%;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2b333f;
  background-color: rgba(136, 183, 255, 0.986);
  border-radius: 50%;
  transition: all 0.4s;
}
.video-js .vjs-first-tool-button > .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f111";
}
.video-js .vjs-second-tool-button {
  line-height: 1.5em;
  height: 2em;
  width: 2em;
  display: block;
  position: absolute;
  top: 220%;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2b333f;
  background-color: rgba(136, 183, 255, 0.986);
  border-radius: 50%;
  transition: all 0.4s;
}
 
.video-js .vjs-second-tool-button > .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f112";
}
*/
.interactive-player *,
.interactive-player ::before,
.interactive-player ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
}
.video-js .vjs-tools-wrapper {
  right: 0;
  top: 0;
  position: absolute;
  margin: 16px;
  display: flex;
  flex-direction: row-reverse;
}
.video-js .vjs-tools-wrapper .vjs-tools-parent-button {
  z-index: 30;
  width: 48px;
  position: relative;
  margin-left: 8px;
  height: 48px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 2px;
  border-radius: 9999px;
  background-color: #2c3e50;
  border-style: solid;
  border-color: white;
}

.video-js
  .vjs-tools-wrapper
  .vjs-tools-parent-button
  .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f110";
  color: white;
  font-size: 2em;
  font-weight: 500;
}

.video-js .vjs-tools-wrapper .vjs-tools-toggler {
  flex-direction: row-reverse;
  display: flex;
}

.video-js .vjs-tools-wrapper .vjs-tools-toggler > * {
  z-index: 30;
  width: 48px;
  position: relative;
  margin-left: 8px;
  height: 48px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 2px;
  border-radius: 9999px;
  background-color: #2c3e50;
  border-style: solid;
  border-color: white;
}
.video-js
  .vjs-tools-wrapper
  .vjs-tools-toggler
  .vjs-first-tool-button
  .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f111";
  color: white;
  font-size: 2em;
  font-weight: 500;
}
.video-js
  .vjs-tools-wrapper
  .vjs-tools-toggler
  .vjs-second-tool-button
  .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f112";
  color: white;
  font-size: 2em;
  font-weight: 500;
}
</style>

