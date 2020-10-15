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
      <button type="button" class="btn btn-success mr-2" @click="playerGetTime">
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
        this.addClass("vjs-icon-next-item");
        this.controlText("Next");
        // if (options.text) {
        //   this.updateTextContent(options.text);
        //   this.addClass("vjs-icon-previous-item");
        // }
      }

      // updateTextContent(text) {
      //   if (typeof text !== "string") {
      //     text = "Title Unknown";
      //   }
      //   videojs.dom.emptyEl(this.el());
      //   videojs.dom.appendContent(this.el(), text);
      // }

      handleClick() {
        console.log("clicked button ", this.el());
      }
    }
    class SkipBackwardButton extends VjsButton {
      constructor(player, options) {
        super(player, options);
        this.addClass("vjs-icon-previous-item");
        this.controlText("Next");
        // if (options.text) {
        //   this.updateTextContent(options.text);
        //   this.addClass("vjs-icon-previous-item");
        // }
      }

      // updateTextContent(text) {
      //   if (typeof text !== "string") {
      //     text = "Title Unknown";
      //   }
      //   videojs.dom.emptyEl(this.el());
      //   videojs.dom.appendContent(this.el(), text);
      // }

      handleClick() {
        const now = "";
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

    // videojs.registerComponent("NextButton", NextButton);

    //------ player
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    // var skipBehindButton = this.player.controlBar.addChild("button");
    // var skipBehindButtonDom = skipBehindButton.el();
    // skipBehindButtonDom.innerHTML = ">";
    // skipBehindButton.addClass("buttonClass");
    // skipBehindButtonDom.onclick = skipBasedOnFrames(120);
    // function skipBasedOnFrames(numOfFramesPerSec) {
    //   const skipBy = 1 / numOfFramesPerSec;
    //   console.log(skipBy);
    //   this.player.currentTime(this.player.currentTime() + 30);
    // }
    // console.log(skipBehindButton);
    // console.log(skipBehindButtonDom);
    // var player = videojs('some-video-id');
    // var Button = videojs.getComponent("Button");
    // var button = new Button(this.player, {
    //   clickHandler: function () {
    //     videojs.log("Clicked");
    //   },
    // });
    // console.log(button.el());

    // button = this.player.addChild("button", {
    //   text: "Press Me",
    //   buttonChildExample: {
    //     buttonChildOption: true,
    //   },
    // });

    // console.log(button.el());
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
</style>

