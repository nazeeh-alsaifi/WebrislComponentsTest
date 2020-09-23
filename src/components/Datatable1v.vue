<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="header in allHeaders" :key="header.id" scope="col">
          {{ header.value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in allRows" :key="row.id">
        <td v-for="(key, index) in Object.keys(row)" :key="index">
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Datatable1v",

  computed: mapGetters(["allHeaders", "allRows"]),
};
</script>

<style>
</style>