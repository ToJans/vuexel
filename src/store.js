import Vue from "vue";
import Vuex from "vuex";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
Vue.use(Vuex);

export default new Vuex.Store({
    state: () => {
        return {
            sheets: []
        }
    },
    mutations: {
        saveSheet: (state,{name,gridFormulas,rowCount,columnCount,uuid,currentCellRange}) => {
            state.sheets[uuid] = {name,gridFormulas,rowCount,columnCount,uuid,currentCellRange};
        },
        deleteSheet: (state, uuid) => {
            delete state.sheets[uuid];
        }
    }, 
    getters: {
        newSheet: (state) => () => {
            return {name:null,gridFormulas:{},rowCount:10,columnCount:10,uuid:uuidv4(),currentCellRange: {row:1,column:1}}
        },
        sheetById: (state) => ( uuid) => {
            return state.sheets[uuid];
        }
    }
})