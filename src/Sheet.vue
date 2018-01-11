<template>
    <table>
        <thead>
            <tr>
                <td colspan="2">
                    Name
                </td>
                <td :colspan="2">
                    <input v-model="name" type="text" placeholder="Unnamed sheet - specify a name" style="width:100%"/> 
                <td><input type="button" @click.prevent="save" :disabled="!hasUnsavedChanges || !name" value="save"></td>
                <td>Rows</td>
                <td><input type="number" v-model.number="rowCount"></td>
                <td>Columns</td>
                <td><input type="number" v-model.number="columnCount"></td>
                <td v-if="hasUnsavedChanges" colspan="3">THIS DOCUMENT HAS UNSAVED CHANGES</td>
            </tr>
            <tr>
                <td>{{currentCell.label}}</td>
                <td :colspan="columnCount" class="formula-editor">
                    <input ref="formula" v-model="gridFormulas[currentCell.label]" @change="hasUnsavedChanges=true" />
                </td>
            </tr>
            <tr>
                <th class="column-header row-header">&nbsp;</th>
                <th v-for="ic in columnCount" :key="'ch'+ic" class="row-header">
                    {{columnLabel(ic)}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ir in rowCount" :key="'rh'+ir">
                <th class="column-header">
                    {{rowLabel(ir)}}
                </th>
                <td v-for="ic in columnCount" :key="'c'+ic+'r'+ir" class="cell" 
                    @click="setCurrentCell(ir,ic)" 
                    :class="{ 'selected-cell': currentCell.row===ir && currentCell.column === ic, error: (cellValue(ir,ic)+'').match(/^#ERROR/)}"
                    v-html="cellDisplayValue(ir,ic)">
                    
                </td>
            </tr>
        </tbody>
    </table>
  
</template>

<script>

export default {
  data: function() {
      const uuid=this.$route.params.uuid;
      let sheet;
      if (uuid && uuid!=="new") {
         sheet= this.$store.getters.sheetById(uuid);
      } else {
          sheet= this.$store.getters.newSheet();
      }
      sheet.hasUnsavedChanges = false;
      sheet.name=sheet.name||"";
      return sheet;
  },
  methods: {
      rowLabel: function(rowIndex) {
          return rowIndex+"";
      },
      columnLabel: function(columnIndex){
          let label="";
          const availableLabels="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
          do {
              let i = columnIndex % availableLabels.length;
              if (columnIndex<availableLabels.length) {
                  i--;
              }
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
      },
      save: function () {
          this.$store.commit("saveSheet",{
              name: this.name,
              gridFormulas:this.gridFormulas,
              rowCount:this.rowCount,
              columnCount:this.columnCount,
              uuid: this.uuid,
              currentCellRange: this.currentCellRange
          });
          this.hasUnsavedChanges = false;
          if ((this.$route.params.uuid || "new") === "new") {
              this.$router.replace("/sheets/"+this.uuid)
          }
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
            this.hasUnsavedChanges = true;
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
                        // cached
                        if (cached.hasOwnProperty(label)) {
                            retval = cached[label];
                        // empty
                        } else if (fmla === null || fmla==="") {
                            retval = null;
                        // formula
                        } else if (fmla[0] === "=") {
                            const fnText = `let res;with(__scope){ res=(${fmla.substring(1)});}; return res;`
                            var fn = new Function("__scope",fnText);
                            retval = fn(scope);
                        // assume number, else string
                        } else {
                            retval = parseFloat(fmla);
                            if (isNaN(retval)) {
                                retval = fmla;
                            }
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

    .cell.error {
        font-weight: bolder;
        color: darkred;
    }

    input[type=number] {
        width:9em;
    }

</style>


