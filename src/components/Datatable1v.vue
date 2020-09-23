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
        <td>{{ row.id }}</td>
        <td>{{ row.col1 }}</td>
        <td>{{ row.col2 }}</td>
        <td>{{ row.col3 }}</td>
        <td>{{ row.col4 }}</td>
        <td>{{ row.col5 }}</td>
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