import task_module from './task/store'
import BoardRoot   from './board-root';


export default {

	namespaced: true,



	state: {

		current_board: null,

		boards: [],

	},



	mutations: {
		_setBoards(state, boards){
			state.boards = boards;
		},

		_setCurrentBoard(state, board){
			state.current_board = board;
		}
	},



	actions: {
		async loadAllBoards(context){
			const boards = await BoardRoot.loadAllFromCache();
			context.commit('_setBoards', boards);
		}
	},



	modules: {
		'task': task_module
	}

};