<template>
  <table>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>길이</th>
    </tr>
    <tr>
      <td>{{ videoTable.num }}</td>
      <td>{{ videoTable.title }}</td>
      <td>{{ videoTable.length }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      videoTable: {
        num: 0,
        title: "",
        length: "",
      },
    };
  },
  methods: {
    addRow() {
      this.videoTable.push({ num: 0, title: "1", length: "1" });
    },
  },
};
</script>

<style scoped>
table {
  margin-left: 30px;
  margin-top: 30px;
  width: 95%;
  border: 1px solid #444444;
}
th,
td {
  border: 1px solid #444444;
}
</style>
