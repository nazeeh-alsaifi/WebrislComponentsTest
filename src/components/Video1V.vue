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
          TitleBar: { text: {} },
          controlBar: {
            children: {
              SkipBackwardButton: true,
              playToggle: true,
              SkipForwardButton: true,
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
  computed: { ...mapGetters(["getSources", "getCurrentSource"]) },
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
    //--------------- skip forward button -----------------------
    let VjsButton = videojs.getComponent("Button");
    class SkipForwardButton extends VjsButton {
      constructor(player, options) {
        super(player, options);
        this.controlText("Next");
      }
      buildCSSClass() {
        return `vjs-skip-forward-item ${super.buildCSSClass()}`;
      }

      handleClick() {
        const now = this.player_.currentTime();
        this.player_.currentTime(now + 2);
        console.log("clicked button", now);
      }
    }
    class SkipBackwardButton extends VjsButton {
      constructor(player, options) {
        super(player, options);
        this.controlText("Next");
      }

      buildCSSClass() {
        return `vjs-skip-backward-item ${super.buildCSSClass()}`;
      }
      handleClick() {
        const now = this.player_.currentTime();
        this.player_.currentTime(now - 0.5);
        console.log(now);
      }
    }

    //--------------- title Bar -----------------------
    // Changing title bar to ES6 and remove deprecate
    let BaseComponent = videojs.getComponent("Component");
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

    //------- Regestring componenets------------
    videojs.registerComponent("TitleBar", TitleBar);
    videojs.registerComponent("SkipForwardButton", SkipForwardButton);
    videojs.registerComponent("SkipBackwardButton", SkipBackwardButton);

    //------ player
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
</style>

