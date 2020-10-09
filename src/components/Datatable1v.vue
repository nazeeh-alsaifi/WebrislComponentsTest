<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="header in allHeaders" :key="header.id" scope="col">
          <div v-show="header.edit == false" @dblclick="header.edit = true">
            {{ header.value }}
          </div>
          <input
            v-show="header.edit == true"
            v-model="header.value"
            v-on:blur="
              header.edit = false;
              updateHeader(header);
            "
            @keyup.enter="$event.target.blur()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="(row, propertyName, index) in allRows" :key="index">
        <td v-for="rowObject in row" :key="rowObject.id">
          <div
            v-show="rowObject.edit == false"
            @dblclick="rowObject.edit = true"
          >
            {{ rowObject.value }}
          </div>
          <input
            v-show="rowObject.edit == true"
            v-model="rowObject.value"
            v-on:blur="
              rowObject.edit = false;
              updateRow(rowObject, $event);
            "
            @keyup.enter="$event.target.blur()"
          />
        </td>
      </tr> -->

      <tr v-for="row in allRows" :key="row.id">
        <td v-for="rowObject in row.rowObjects" :key="rowObject.id">
          <div
            v-show="rowObject.edit == false"
            @dblclick="rowObject.edit = true"
          >
            {{ rowObject.value }}
          </div>
          <input
            v-show="rowObject.edit == true"
            v-model="rowObject.value"
            v-on:blur="
              rowObject.edit = false;
              sendRowDetails(row.id, rowObject);
            "
            @keyup.enter="$event.target.blur()"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Datatable1v",
  methods: {
    ...mapActions(["updateHeader", "updateRow"]),

    sendRowDetails(id, obj) {
      const rowDetails = {};
      rowDetails["id"] = id;
      rowDetails["obj"] = obj;
      console.log("rowDetails", rowDetails);

      this.updateRow(rowDetails);
    },
  },
  computed: mapGetters(["allHeaders", "allRows"]),
};
</script>

<style>
/* input:focus {
  outline: none;
}
input {
  border: 0px;
} */
</style>