<template>
    <table>
        <thead>
            <tr>
                <td>{{currentCell.label}}</td>
                <td :colspan="columnCount-1" class="formula-editor">
                    <input v-model="currentCellValue" />
                </td>
            </tr>
            <tr>
                <th class="column-header row-header">&nbsp;</th>
                <th v-for="ic in columnCount" :key="'c'+ic" class="row-header">
                    {{columnLabel(ic)}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ir in rowCount" :key="'r'+ir">
                <th class="column-header">
                    {{rowLabel(ir)}}
                </th>
                <td v-for="ic in columnCount" :key="'c'+ic+'r'+ir" class="cell" 
                    @click="currentCellRange={row:ir,column:ic}" 
                    :class="{'selected-cell':currentCell.row===ir && currentCell.column === ic}">
                    {{cellDisplayValue(ir,ic)}}
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
          rowCount,columnCount,gridValues, currentCellRange: {row:1,column:1}
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
  }, computed: {
      currentCell: function () {
          let row = this.currentCellRange.row;
          let column = this.currentCellRange.column;
          let label = this.cellLabel(row,column);
          return {
            row,column,label
          }
      },
      currentCellValue: {
        get:function () {
            return this.currentCell.value;
        },
        set: function (value) {
            this.$set(this.gridValues, this.currentCell.label,value);
        }
      }
  }
}
</script>

<style scoped>
    .column-header, .row-header, .cell {
        border: 1px solid darkgray;
    }

    .row-header {
        min-width: 8em;
    }

    .column-header {
        min-width: 2em;
    }

    .formula-editor input {
        width:100%;
    }

    .selected-cell {
        border: 2px blue solid;
    }

    table {
        border-spacing: 0px;
    }

</style>


