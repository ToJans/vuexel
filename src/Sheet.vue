<template>
    <table>
        <thead>
            <tr>
                <th v-for="ic in columnCount" :key="ic">
                    {{columnLabel(ic)}}
                </th>
            </tr>
        </thead>
    </table>
  
</template>

<script>
export default {
  data: function()
  {
      var rowCount=10,columnCount=26;
      var gridValues = {};
      return {
          rowCount,columnCount,gridValues
      }
  },
  methods: {
      rowLabel: function(rowIndex) {
          return rowIndex+"";
      },
      columnLabel: function(columnIndex){
          let label="";
          columnIndex--;
          const availableLabels="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
          do {
              let i = columnIndex % availableLabels.length;
              label = availableLabels[i]+label;
              columnIndex = Math.floor(columnIndex/availableLabels.length);
          } while (columnIndex > 0)
          return label;
      },
      cellLabel: function(rowIndex,columnIndex) {
          return columnLabel(columnIndex)+rowLabel(rowIndex);
      },
      cellValue: function(rowIndex,columnIndex){
          const label = this.cellLabel(rowIndex,columnIndex);
          if (this.gridValues.hasOwnProperty(label)) {
              return this.gridValues[label];
          } else {
              return null;
          }
      }
  }
}
</script>

<style scoped>
    th, td {
        min-width: 8em;
        border: 1px solid darkgray;
    }
</style>


