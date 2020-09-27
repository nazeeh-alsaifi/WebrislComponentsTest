<template>
  <div>
    <div class="m-2">
      <button type="button" class="btn btn-primary mr-2" @click="addRow">
        Add Row
      </button>

      <button type="button" class="btn btn-success mr-2" @click="deleteRow">
        Delete Row
      </button>
      <button type="button" class="btn btn-danger mr-2" @click="addHeader">
        Add Column
      </button>
      <button type="button" class="btn btn-warning" @click="deleteHeader">
        Remove Column
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TableControl",
  methods: {
    ...mapActions(["addRow", "deleteRow", "addHeader", "deleteHeader"]),
  },
};
</script>

<style>
</style>