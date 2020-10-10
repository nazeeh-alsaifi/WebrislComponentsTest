<template>
  <div>
    <video ref="videoPlayer" class="video-js" width="600" height="300">
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
        return {};
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
