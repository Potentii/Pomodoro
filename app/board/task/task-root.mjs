import log  from '../../@infra/log';
import Task from './task';



export default class TaskRoot{

	constructor(){}


	/**
	 *
	 * @returns {Promise<Task[]>}
	 */
	static async loadAllFromCache(){
		const str = localStorage.getItem('pomodoro:tasks');
		if(str){
			try{
				const obj = JSON.parse(str);
				if(Array.isArray(obj))
					return obj.map(Task.from);
			} catch(err){
				log.error(`Cannot read from cache`, err);
			}
		}
		return [];
	}


	/**
	 *
	 * @param {Task[]} tasks
	 * @returns {Promise<Task[]>}
	 */
	static async updateCache(tasks){
		if(!Array.isArray(tasks) || !tasks.every(t => t instanceof Task))
			throw new TypeError(`Cannot update the tasks cache: They must be instance of Task`);

		localStorage.setItem('pomodoro:tasks', JSON.stringify(tasks));

		return tasks;
	}


	/**
	 *
	 * @param {Task[]|Task} tasks
	 * @returns {Promise<Task[]>}
	 */
	static async updateTasks(tasks){
		if(tasks instanceof Task)
			tasks = [tasks];
		else if(!Array.isArray(tasks) || !tasks.every(t => t instanceof Task))
			throw new TypeError(``);

		const all_tasks = await TaskRoot.loadAllFromCache();

		if(!tasks.length)
			return all_tasks;

		for(let new_task of tasks){
			const index = all_tasks.findIndex(t => t.id === new_task.id);
			if(index >= 0)
				all_tasks[index] = new_task;
			else
				all_tasks.push(new_task);
		}

		return TaskRoot.updateCache(all_tasks);
	}

}