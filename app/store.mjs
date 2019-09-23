import Vue from 'vue'
import Vuex from 'vuex'

// *Getting the stores from each context:
import board_module from './board/store'
import timer_module from './timer/store'



Vue.use(Vuex);


export default new Vuex.Store({

   state: {

   },



   mutations: {

   },



   modules: {
      'board': board_module,
      'timer': timer_module,
   }

});
