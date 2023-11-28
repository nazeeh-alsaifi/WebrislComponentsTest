<template>
  <div class="page main">
    <div class="container">
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
      >
        <span>Vue Moveable</span>
      </Moveable>

      <button
        v-for="(state, key) in states"
        :key="key"
        type="button"
        class="btn btn-primary mr-2"
        @click="currentState = key"
      >
        {{ state }}
      </button>
    </div>
  </div>
</template>

<script>
import Moveable from "vue-moveable";
export default {
  name: "Movable1",
  components: {
    Moveable,
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 1,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0.01,
      rotatable: true,
      throttleRotate: 0.2,
      pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
      origin: false,
    },
    states: {
      scalable: "Scalable",
      resizable: "Resizable",
      warpable: "Warpable",
    },
    currentState: "scalable",
  }),
  methods: {
    handleDrag({ target, transform }) {
      console.log("onDrag", transform);
      target.style.transform = transform;
    },
    handleResize({ target, width, height }) {
      console.log("onResize", width, height);
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
    },
    handleScale({ target, transform }) {
      console.log("onScale", transform);
      target.style.transform = transform;
    },
    handleRotate({ target, transform }) {
      console.log("onRotate", transform);
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log("onWarp", transform);
      target.style.transform = transform;
    },
    clearAllStates() {
      Object.keys(this.states).forEach((key) => {
        this.moveable[key] = false;
      });
    },
  },
  watch: {
    currentState(newState) {
      this.clearAllStates();
      this.moveable[newState] = true;
    },
  },
};
</script>

<style>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.page:nth-child(2n) {
  background: #f0f0f0;
}
.page.main {
  z-index: 1;
  /* min-height: 700px; */
}

.container {
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
}

.moveable {
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 300px;
  height: 200px;
  text-align: center;
  font-size: 40px;
  margin: 0 auto;
  font-weight: 100;
  letter-spacing: 1px;
}

.moveable span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>