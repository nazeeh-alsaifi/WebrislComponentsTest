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
  MyFrameDisplay,
  MyFpsDisplay,
  ResetTimer,
} from "@/player_components/timerComponent.js";
import { RulerWrapper } from "@/player_components/rulerComponents.js";
import { mapActions, mapGetters } from "vuex";
import "@interactjs/auto-start";
import "@interactjs/actions/drag";
import "@interactjs/actions/resize";
import "@interactjs/modifiers";
import "@interactjs/dev-tools";
import interact from "@interactjs/interact";

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
                      MyFrameDisplay: { fps: 25 },
                      MyFpsDisplay: { fps: 25 },
                    },
                  },
                  ResetTimer: true,
                },
              },
            },
          },
          RulerWrapper: true,
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
        return +(this.player.currentTime() * 25).toFixed(0);
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
    //================== interact js testing =====================
    interact(".draggable").draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          // endOnly: true,
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,

        // call this function on every dragend event
        // end(event) {
        //   var textEl = event.target.querySelector("p");

        //   textEl &&
        //     (textEl.textContent =
        //       "moved a distance of " +
        //       Math.sqrt(
        //         (Math.pow(event.pageX - event.x0, 2) +
        //           Math.pow(event.pageY - event.y0, 2)) |
        //           0
        //       ).toFixed(2) +
        //       "px");
        // },
      },
    });

    function dragMoveListener(event) {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
    //===============================interact js testing end=========================================

    //============= Regestring componenets ==========
    //---- tools components
    videojs.registerComponent("ToolsWrapper", ToolsWrapper);
    videojs.registerComponent("ToolsToggler", ToolsToggler);
    videojs.registerComponent("ToolsParentButton", ToolsParentButton);
    videojs.registerComponent("FirstToolButton", FirstToolButton);
    videojs.registerComponent("SecondToolButton", SecondToolButton);
    videojs.registerComponent("TimerButton", TimerButton);

    //------- Timer Components
    videojs.registerComponent("TimerMoveable", TimerMoveable);
    videojs.registerComponent("TimerDetailsWrapper", TimerDetailsWrapper);
    videojs.registerComponent("TimerVideoDetails", TimerVideoDetails);
    videojs.registerComponent("MyTimeDisplay", MyTimeDisplay);
    videojs.registerComponent("MyFrameDisplay", MyFrameDisplay);
    videojs.registerComponent("MyFpsDisplay", MyFpsDisplay);
    videojs.registerComponent("ResetTimer", ResetTimer);

    // Rulers Components
    videojs.registerComponent("RulerWrapper", RulerWrapper);

    //---- control bar compoennts
    videojs.registerComponent("SkipForwardButton", SkipForwardButton);
    videojs.registerComponent("SkipBackwardButton", SkipBackwardButton);

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
.video-js .vjs-timer-moveable button {
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 9999px;
  background-color: #2c3e50;
  border-style: solid;
  border-color: white;
}
.video-js .vjs-timer-moveable .vjs-icon-placeholder:before {
  font-family: "VideoJs";
  content: "\f116";
  font-size: 2em;
}

/* ======== timer component styling ========= */
.video-js .vjs-timer-moveable {
  /* transform: translate(-25%, -25%); */
  left: 0;
  top: 0;
  z-index: 29;
  position: absolute;
  cursor: move;
  border-width: 2px;
  border-radius: 4px;
  --border-opacity: 1;
  /* border-color: rgba(255, 255, 255, var(--border-opacity)); */
  background-color: rgba(0, 0, 0, 0.65);
  /* -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none; */
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
}

.video-js .vjs-ruler-wrapper {
  /* transform: translate(-25%, -25%); */
  left: 0;
  top: 0;
  z-index: 29;
  position: absolute;
  cursor: move;
  border-width: 2px;
  border-radius: 4px;
  --border-opacity: 1;
  /* border-color: rgba(255, 255, 255, var(--border-opacity)); */
  background-color: rgba(0, 0, 0, 0.65);
  /* -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none; */
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
}
.video-js .vjs-ruler-wrapper img {
  width: 50px;
  height: 50px;
}
/* ================ NEW CONVENTION STYLING ==============*/

.interactive-player p {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
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
.interactive-player .p-text-black {
  color: rgb(255, 255, 255);
}
.interactive-player .p-bg-white {
  background-color: rgb(7, 10, 12);
}
.interactive-player .p-text-black {
  --text-opacity: 1;
  color: #000;
  color: rgba(0, 0, 0, var(--text-opacity));
}
.interactive-player .p-bg-white {
  --bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
}
.interactive-player .p-ml-0 {
  margin-left: 0;
}
.interactive-player .p-m-2 {
  margin: 8px;
}
.interactive-player .p-rounded-full {
  border-radius: 9999px;
}
.interactive-player .p-h-12 {
  height: 48px;
}
.interactive-player .p-w-12 {
  width: 48px;
}

/* "\f116" */
</style>

