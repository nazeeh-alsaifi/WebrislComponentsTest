<template>
  <div class="container mb-5 mt-5">
    <div id="video_player">
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
          ToolsParent: true,
          // ToolsParentButton: true,
          // FirstToolButton: true,
          ToolsParentClickableComp: {
            children: {
              FirstToolButton: true,
              SecondToolButton: true,
            },
          },
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
    };
  },
  computed: {
    ...mapGetters(["getSources", "getCurrentSource"]),
    playerCurrentTime: function () {
      if (this.player !== null) {
        return this.player.currentTime();
      }
      return 0;
    },
    playerDuration: function () {
      if (this.player !== null) {
        return this.player.duration();
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
        const frameTime = 1 / this.options.fps;
        this.player.currentTime(now + frameTime);
        console.log("clicked button", frameTime);
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
        const now = this.player.currentTime();
        const frameTime = 1 / this.options.fps;
        this.player.currentTime(now - frameTime);
        console.log("clicked button", frameTime);
      }
    }
    // TODO : DELETE
    /* 
    class ToolsParentButton extends VjsButton {
      constructor(player, options) {
        super(player, options);
        this.controlText("Tools Parent Button");
        this.player = player;
        this.options = options;
        // videojs.dom.emptyEl(this.el());
      }
      buildCSSClass() {
        return `vjs-tools-parent-button`;
      }
      handleClick() {
        console.log("tools parent clicked!!");
      }
    }
     */
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
        this.player.controlBar.SkipBackwardButton.hide();
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
        this.player.controlBar.SkipBackwardButton.hide();
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
        return `vjs-tools-parent-button`;
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
    // TODO:delete toolsparent
    // videojs.registerComponent("ToolsParent", ToolsParent);
    //---- extend button
    videojs.registerComponent("SkipForwardButton", SkipForwardButton);
    videojs.registerComponent("SkipBackwardButton", SkipBackwardButton);
    // TODO:delete tools paert button
    // videojs.registerComponent("ToolsParentButton", ToolsParentButton);
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

.vjs-tools-parent {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transform: (-50px, -50px);
}
.video-js .vjs-tools-parent-button {
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
  /* margin: 1% 0%; */
}
.video-js .vjs-tools-parent-button > .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f110";
}
.video-js .vjs-first-tool-button {
  /* font-size: 3em; */
  line-height: 1.5em;
  height: 2em;
  width: 2em;
  display: block;
  position: absolute;
  top: 110%;
  /* left: 83%; */
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
  /* font-size: 3em; */
  line-height: 1.5em;
  height: 2em;
  width: 2em;
  display: block;
  position: absolute;
  top: 220%;
  /* bottom: %; */
  /* left: 83%; */
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
</style>

