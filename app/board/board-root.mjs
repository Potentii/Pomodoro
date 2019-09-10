import Board from './board';
import log   from '../@infra/log';



export default class BoardRoot{

	constructor(){}


	/**
	 *
	 * @returns {Promise<Board[]>}
	 */
	static async loadAllFromCache(){
		const str = localStorage.getItem('pomodoro:boards');
		if(str){
			try{
				const obj = JSON.parse(str);
				if(Array.isArray(obj))
					return obj.map(Board.from);
			} catch(err){
				log.error(`Cannot read from cache`, err);
			}
		}
		return [];
	}


	/**
	 *
	 * @param {Board[]} boards
	 * @returns {Promise<void>}
	 */
	static async updateBoardsOnCache(boards){
		if(!Array.isArray(boards) || !boards.every(b => b instanceof Board))
			throw new TypeError(`Cannot update the boards cache: They must be instance of Board`);

		localStorage.setItem('pomodoro:boards', JSON.stringify(boards));
	}


	static async updateBoardOnCache(board){
		if(!(board instanceof Board))
			throw new TypeError();

		const all_boards = await BoardRoot.loadAllFromCache();
		const index_to_update = all_boards.findIndex(b => b.id === board.id);
		if(index_to_update >= 0)
			all_boards[index_to_update] = board;
		else
			all_boards.push(board);

		await BoardRoot.updateBoardsOnCache(all_boards);
	}


	static async setActiveBoardIdOnCache(_board){
		localStorage.setItem('pomodoro:active-board', _board);
	}

	static async getActiveBoardIdOnCache(){
		const _board = localStorage.getItem('pomodoro:active-board');
		return _board && _board.trim().length ? _board.trim() : null;
	}

}