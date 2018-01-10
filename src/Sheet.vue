<template>
    <table>
        <thead>
            <tr>
                <th class="column-header row-header">&nbsp;</th>
                <th v-for="ic in columnCount" :key="'c'+ic" class="row-header">
                    {{columnLabel(ic)}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="rc in rowCount" :key="'r'+rc">
                <th class="column-header">
                    {{rowLabel(rc)}}
                </th>
                <td v-for="ic in columnCount" :key="'c'+ic" class="cell">
                    {{cellDisplayValue(rc,ic)}}
                </td>
            </tr>
        </tbody>
    </table>
  
</template>

<script>
export default {
  data: function()
  {
      var rowCount=10,columnCount=26;
      var gridValues = {B3:123, C5:"Zorro"};
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
          return this.columnLabel(columnIndex)+this.rowLabel(rowIndex);
      },
      cellValue: function(rowIndex,columnIndex){
          const label = this.cellLabel(rowIndex,columnIndex);
          if (this.gridValues.hasOwnProperty(label)) {
              return this.gridValues[label];
          } else {
              return null;
          }
      },
      cellDisplayValue: function (rowIndex, columnIndex) {
          const val = this.cellValue(rowIndex,columnIndex);
          if (val === null) {
              return ""
          } else {
              return val;
          }
      }
  }
}
</script>

<style scoped>
    th, td {
        border: 1px solid darkgray;
    }

    .row-header {
        min-width: 8em;
    }

    .column-header {
        min-width: 2em;
    }

</style>


