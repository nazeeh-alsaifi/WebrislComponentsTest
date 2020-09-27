<template>
  <div>
    <div class="m-2">
      <button type="button" class="btn btn-primary mr-2" @click="addRow2">
        Add Row
      </button>

      <button type="button" class="btn btn-success mr-2" @click="deleteRow2">
        Delete Row
      </button>
      <button type="button" class="btn btn-danger mr-2" @click="addHeader2">
        Add Column
      </button>
      <button type="button" class="btn btn-warning" @click="deleteHeader2">
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
    ...mapActions([
      "addRow",
      "addRow2",
      "deleteRow",
      "deleteRow2",
      "addHeader",
      "addHeader2",
      "deleteHeader",
      "deleteHeader2",
    ]),
  },
};
</script>

<style>
</style>