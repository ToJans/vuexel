<template>
    <table>
        <thead>
            <tr>
                <td>{{currentCell.label}}</td>
                <td :colspan="columnCount-1" class="formula-editor">
                    <input ref="formula" v-model="gridFormulas[currentCell.label]" />
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
                    @click="setCurrentCell(ir,ic)" 
                    :class="{'selected-cell':currentCell.row===ir && currentCell.column === ic}"
                    v-html="cellDisplayValue(ir,ic)">
                    
                </td>
            </tr>
        </tbody>
    </table>
  
</template>

<script>

export default {
  data: function()  {
      var rowCount=10,columnCount=26;
      var gridFormulas = {B3:"123", C5:"'Zorro"};
      return {
          rowCount,columnCount,gridFormulas, currentCellRange: {row:1,column:1}
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
      },
      setCurrentCell: function(row,column) {
          this.currentCellRange = {row,column};
          this.$refs.formula.focus();
      }
  }, computed: {
      currentCell:  function () {
            let row = this.currentCellRange.row;
            let column = this.currentCellRange.column;
            let label = this.cellLabel(row,column);
            return {
                row,column,label
            }
      },
      currentCellValue: {
        get:function () {
            return this.cellValue(this.currentCell.row,this.currentCell.column);
        },
        set: function (formula) {
            this.$set(this.gridFormulas, this.currentCell.label,formula);
        }
      },
      gridValues: function () {
        let cached  = {};
        let scope = {
            img: (url) => `<img src="${url}"/>`
        };
        var labels = Object.keys(this.gridFormulas);
        for (const l in this.gridFormulas) {
            const label = l;
            const fmla = this.gridFormulas[label];
            Object.defineProperty(scope,label,{
                get: function(){
                    let retval = "#ERROR";
                    try {
                        if (cached.hasOwnProperty(label)) {
                            retval = cached[label];
                        } else if (fmla === null) {
                            retval = null;
                        } else if (fmla[0] === "'") {
                            retval = fmla.substring(1);
                        } else if (fmla[0] === "=") {
                            const fnText = `let res;with(__scope){ res=(${fmla.substring(1)});}; return res;`
                            var fn = new Function("__scope",fnText);
                            retval = fn(scope);
                        } else {
                            retval = parseFloat(fmla);
                        }
                    } catch (e) {
                        retval="#ERROR "+e;
                    }
                    cached[label] = retval;
                    return retval
                },
                enumerable: false,
                configurable: false
            })
        }
        var retval = {};
        for (var k in this.gridFormulas) {
            retval[k] = scope[k];
        }
        return retval;
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


