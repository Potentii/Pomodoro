import TaskRoot  from './task-root';



export default {

	namespaced: true,



	state: {

		tasks: [],

	},



	mutations: {
		_setTasks(state, tasks){
			state.tasks = tasks;
		}
	},



	actions: {
		async loadAllTasks(context){
			const tasks = await TaskRoot.loadAllFromCache();
			context.commit('_setTasks', tasks);
		},

		/**
		 *
		 * @param [context]
		 * @param {Task[]|Task} tasks
		 * @returns {Promise<void>}
		 */
		async updateTasks(context, tasks){
			const new_tasks = await TaskRoot.updateTasks(tasks);
			context.commit('_setTasks', new_tasks);
		},


		async calculateTasksState(context){
			const tasks = context.state.tasks;
			/**
			 *
			 * @type {Map<String, Task[]>}
			 */
			const tasks_by_board_id = tasks.reduce((map, t) => {
				if(map.has(t._board))
					map.get(t._board).push(t);
				else
					map.set(t._board, [t]);
				return map;
			}, new Map());

			// console.log(tasks_by_board_id.entries());

			for(let [_board, tasks] of tasks_by_board_id.entries()){
				const last_running_task = tasks.find(t => t.isRunning());
				if(!last_running_task)
					continue;



				console.log(last_running_task.title);

				for(let task of tasks){

				}
			}
		},

	},



	modules: {

	}

};