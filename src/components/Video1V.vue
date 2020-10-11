<template>
  <div class="container mb-5 mt-5">
    <video
      ref="videoPlayer"
      class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
      :poster="getSource.poster"
    >
      <source :src="getSource.src" :type="getSource.type" />
    </video>
    <button type="button" class="btn btn-success mr-2" @click="loadSource">
      change source
    </button>
  </div>
</template>

<script>
import videojs from "video.js";
import { mapGetters } from "vuex";

export default {
  name: "Video1V",
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: false,
          controls: true,
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
  computed: { ...mapGetters(["getSource"]) },
  mounted() {
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
