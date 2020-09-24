<template>
  <div>
    <div>
      <button type="button" class="btn btn-primary mr-2" @click="addRow">
        Add Row
      </button>

      <button type="button" class="btn btn-secondary mr-2" @click="deleteRow">
        Delete Row
      </button>
      <button type="button" class="btn btn-danger" @click="addHeader">
        Add Column
      </button>
      <button type="button" class="btn btn-danger" @click="deleteHeader">
        Add Column
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