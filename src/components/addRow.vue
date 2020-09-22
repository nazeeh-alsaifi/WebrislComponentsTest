<template>
  <div>
    <h3>Add Row:</h3>
    <div>
      <button type="button" class="btn btn-primary" @click="addRow">
        Primary
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "addRow",
  methods: { ...mapActions(["addRow"]) },
};
</script>

<style>
</style>