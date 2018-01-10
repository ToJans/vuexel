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

            </tr>
        </tbody>
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
        border: 1px solid darkgray;
    }

    .row-header {
        min-width: 8em;
    }

    .column-header {
        min-width: 2em;
    }

</style>


