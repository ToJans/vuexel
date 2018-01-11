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
            sheets: {
                examplesheet: {
                    "name":"Example sheet",
                    "gridFormulas":{
                        "E6":"=2+1",
                        "A6":"=function(radians){ return radians*180/Math.PI;}",
                        "B5":"Radians","C5":"Degrees",
                        "B6":"=Math.PI","C6":"=A6(B6)",
                        "A8":"Image url",
                        "B8":"https://vuejs.org//images/logo.png",
                        "A9":"Image",
                        "B9":"=`<img src=\"${B8}\"/>`",
                        "A4":"You can define functions",
                        "C7":"^This conversion uses the function defined in A6"
                    },
                    "rowCount":10,"columnCount":10,
                    "uuid":"examplesheet","currentCellRange":{"row":9,"column":2}}
            }
        }
    },
    mutations: {
        saveSheet: (state,{name,gridFormulas,rowCount,columnCount,uuid,currentCellRange}) => {
            Vue.set(state.sheets,uuid,{name,gridFormulas,rowCount,columnCount,uuid,currentCellRange});
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
        },
        sheetList: (state) => {
            return Object.keys(state.sheets).map(uuid=> {
                return {uuid, name: state.sheets[uuid].name};
            });
        }
    }
})