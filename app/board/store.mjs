import BoardRoot   from './board-root';



export default {

	namespaced: true,



	state: {

		/**
		 * @type {Board|null}
		 */
		current_board: null,

		/**
		 * @type {Board[]}
		 */
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
		},


		async loadActiveBoard(context){
			const boards = context.state.boards;
			const _board = await BoardRoot.getActiveBoardIdOnCache();
			context.commit('_setCurrentBoard', boards.find(b => b.id === _board) || null);
		},


		async setBoardAsActive(context, board){
			await BoardRoot.setActiveBoardIdOnCache(board.id);
			context.commit('_setCurrentBoard', board);
		}
	},



	modules: {

	}

};