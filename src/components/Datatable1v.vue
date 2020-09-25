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
      <!-- 
        <tr v-for="row in allRows" :key="row.id">
        <td v-for="(key, index) in Object.keys(row)" :key="index">
          {{ row[key] }}
        </td>
      </tr>
       -->
      <tr v-for="(row, index) in allRows2" :key="index">
        <td v-for="rowObject in row" :key="rowObject.id">
          {{ rowObject.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Datatable1v",
  methods: mapActions(["updateHeader"]),
  computed: mapGetters(["allHeaders", "allRows", "allRows2"]),
};
</script>

<style>
</style>