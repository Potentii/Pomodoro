


export default {

	namespaced: true,



	state: {

		/**
		 * @type {LocalTimer[]}
		 */
		timers: []

	},



	mutations: {

		addTimer(state, timer){
			state.timers.push(timer);
		},

	},



	actions: {

		async resumeTimer(context, name){
			const timers = context.state.timers;
			const timer = timers.find(t => t.name === name);
			await timer.resume();
		}

	},



	modules: {

	}

};