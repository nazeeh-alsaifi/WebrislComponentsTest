<template>
  <div>
    <div>
      <button type="button" class="btn btn-primary mr-2" @click="addRow">
        Add Row
      </button>

      <button type="button" class="btn btn-primary" @click="deleteRow">
        Delete Row
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TableControl",
  methods: { ...mapActions(["addRow", "deleteRow"]) },
};
</script>

<style>
</style>