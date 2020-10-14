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
          TitleBar: { text: "The Title of The Video!" },
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
  },
  mounted() {
    // Get the Component base class from Video.js
    var Component = videojs.getComponent("Component");

    // The videojs.extend function is used to assist with inheritance. In
    // an ES6 environment, `class TitleBar extends Component` would work
    // identically.
    var TitleBar = videojs.extend(Component, {
      // The constructor of a component receives two arguments: the
      // player it will be associated with and an object of options.
      constructor: function (player, options) {
        // It is important to invoke the superclass before anything else,
        // to get all the features of components out of the box!
        Component.apply(this, arguments);

        // If a `text` option was passed in, update the text content of
        // the component.
        if (options.text) {
          this.updateTextContent(options.text);
        }
      },
      // The `createEl` function of a component creates its DOM element.
      createEl: function () {
        return videojs.createEl("div", {
          // Prefixing classes of elements within a player with "vjs-"
          // is a convention used in Video.js.
          className: "vjs-title-bar",
        });
      },
      // This function could be called at any time to update the text
      // contents of the component.
      updateTextContent: function (text) {
        // If no text was provided, default to "Title Unknown"
        if (typeof text !== "string") {
          text = "Title Unknown";
        }
        // Use Video.js utility DOM methods to manipulate the content
        // of the component's element.
        videojs.emptyEl(this.el());
        videojs.appendContent(this.el(), text);
      },
    });
    // Register the component with Video.js, so it can be used in players.
    videojs.registerComponent("TitleBar", TitleBar);

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

<style>
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

