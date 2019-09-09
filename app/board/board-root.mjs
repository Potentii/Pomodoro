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
	static async updateCache(boards){
		if(!Array.isArray(boards) || !boards.every(b => b instanceof Board))
			throw new TypeError(`Cannot update the boards cache: They must be instance of Board`);

		localStorage.setItem('pomodoro:boards', JSON.stringify(boards));
	}

}