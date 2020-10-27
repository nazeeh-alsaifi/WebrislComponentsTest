<template>
  <div id="video_container" class="container mb-5 mt-5">
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
import {
  ToolsParentButton,
  FirstToolButton,
  SecondToolButton,
  ToolsWrapper,
  ToolsToggler,
  TimerButton,
} from "@/player_components/toolsComponents.js";
import {
  SkipForwardButton,
  SkipBackwardButton,
} from "@/player_components/skipComponents.js";
import {
  TimerMoveable,
  TimerDetailsWrapper,
  MyTimeDisplay,
  TimerVideoDetails,
} from "@/player_components/timerComponent.js";
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
          ToolsWrapper: {
            children: {
              ToolsParentButton: true,
              ToolsToggler: {
                children: {
                  FirstToolButton: true,
                  SecondToolButton: true,
                  TimerButton: true,
                },
              },
            },
          },
          TimerMoveable: {
            children: {
              TimerDetailsWrapper: {
                children: {
                  TimerVideoDetails: {
                    children: {
                      MyTimeDisplay: true,
                    },
                  },
                },
              },
            },
          },
          controlBar: {
            children: {
              SkipBackwardButton: { fps: 25 },
              playToggle: true,
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
  },
  mounted() {
    //============= Regestring componenets ==========
    //---- extend component
    videojs.registerComponent("ToolsWrapper", ToolsWrapper);
    videojs.registerComponent("ToolsToggler", ToolsToggler);
    videojs.registerComponent("TimerMoveable", TimerMoveable);
    videojs.registerComponent("TimerDetailsWrapper", TimerDetailsWrapper);
    videojs.registerComponent("TimerVideoDetails", TimerVideoDetails);

    //------- extend NewTimeDisplay
    videojs.registerComponent("MyTimeDisplay", MyTimeDisplay);

    //---- extend button
    videojs.registerComponent("SkipForwardButton", SkipForwardButton);
    videojs.registerComponent("SkipBackwardButton", SkipBackwardButton);
    videojs.registerComponent("ToolsParentButton", ToolsParentButton);
    videojs.registerComponent("FirstToolButton", FirstToolButton);
    videojs.registerComponent("SecondToolButton", SecondToolButton);
    videojs.registerComponent("TimerButton", TimerButton);

    //------ extend clickable component

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
.video-js .vjs-current-time,
.vjs-no-flex .vjs-current-time {
  display: block !important;
}

.interactive-player *,
.interactive-player ::before,
.interactive-player ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
}

/* ========= tools components styling ========== */
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

/* ======== timer component styling ========= */
.video-js .vjs-timer-moveable {
  /* transform: translate(-25%, -25%); */
  left: 50%;
  top: 50%;
  z-index: 29;
  position: absolute;
  cursor: move;
  border-width: 2px;
  border-radius: 4px;
  --border-opacity: 1;
  /* border-color: rgba(255, 255, 255, var(--border-opacity)); */
  background-color: rgba(0, 0, 0, 0.65);
}

/* ================ NEW CONVENTION STYLING ==============*/

.interactive-player .p-items-center {
  align-items: center;
}
.interactive-player .p-flex {
  display: flex;
}
.interactive-player .p-p-2 {
  padding: 8px;
}
.interactive-player .p-whitespace-no-wrap {
  font-size: 16px !important;
  white-space: nowrap;
}
.interactive-player .p-text-center {
  text-align: center;
}
.interactive-player .p-font-mono {
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
}
</style>

