<template>
  <div class="container mb-5 mt-5">
    <video
      ref="videoPlayer"
      class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
    >
      <source :src="sources.src" :type="sources.type" />
    </video>
  </div>
</template>

<script>
import videojs from "video.js";

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
      sources: {
        id: "video-1",
        src: "http://vjs.zencdn.net/v/oceans.mp4",
        poster: "http://covteam.u.qiniudn.com/poster.png",
        type: "video/mp4",
        dataSetup: "{}",
      },
    };
  },
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
