<template>
	<div class="v-home-page">


		<div class="-tomato-container">

			<div class="-tomato">

				<div class="-content">

					<div class="-current">

						<v-pomodoro-task class="-task" v-if="pomodoro" :task="pomodoro"></v-pomodoro-task>

						<!-- TODO show empty state, maybe a tutorial? -->

					</div>

					<v-main-clock class="-timer" :duration="pomodoro ? pomodoro.duration_ms : null"></v-main-clock>

					<div class="-next">

						<ul class="-tasks">
							<v-pomodoro-task class="-task" :key="task._id" :task="task" v-for="task in tasks"></v-pomodoro-task>
						</ul>

					</div>

					<div class="-create-new-box" v-if="!false">

					</div>

				</div>


			</div>

		</div>


	</div>
</template>



<script>
import VPomodoroTask from './v-pomodoro-task';
import PomodoroTask  from './pomodoro-task';
import VMainClock    from './v-main-clock';



export default {

	name: 'v-home-page',


	components: { VMainClock, VPomodoroTask },


	data(){
		return {

			finished: [],

			pomodoro: null,

			tasks: [
				new PomodoroTask('1', 'Tarefa 1', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('11', null, PomodoroTask.TYPES.SHORT_INTERVAL, 1000 * 60 * 5),
				new PomodoroTask('2', 'Tarefa 2', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('21', null, PomodoroTask.TYPES.SHORT_INTERVAL, 1000 * 60 * 5),
				new PomodoroTask('3', 'Tarefa 3', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('31', null, PomodoroTask.TYPES.SHORT_INTERVAL, 1000 * 60 * 5),
				new PomodoroTask('4', 'Tarefa 4', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('41', null, PomodoroTask.TYPES.LONG_INTERVAL, 1000 * 60 * 30),
			],

		};
	},


	mounted(){
		this.advanceToNextTask();
	},


	methods: {

		advanceToNextTask(){
			const next = this.getFirstPomodoroTask();
			const last = this.getCurrentPomodoroTask();
			this.removeFirstPomodoroTask();
			this.addTaskToFinished(last);
			this.setCurrentPomodoroTask(next);
		},

		addTaskToFinished(pomodoro_task){
			this.finished.push(pomodoro_task);
		},

		getCurrentPomodoroTask(){
			return this.pomodoro;
		},

		setCurrentPomodoroTask(pomodoro_task){
			this.pomodoro = pomodoro_task;
		},

		removeFirstPomodoroTask(){
			if(!this.tasks || !this.tasks.length)
				return;
			this.tasks.splice(0, 1);
		},

		removeLastPomodoroTask(){
			if(!this.tasks || !this.tasks.length)
				return;
			this.tasks.splice(this.tasks.length-1, 1);
		},

		getFirstPomodoroTask(){
			if(!this.tasks || !this.tasks.length)
				return null;
			return this.tasks[0];
		},

		getLastPomodoroTask(){
			if(!this.tasks || !this.tasks.length)
				return null;
			return this.tasks[this.tasks.length-1];
		},

	},

}
</script>



<style>
.v-home-page{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
}

.v-home-page > .-tomato-container{
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 23rem;
	max-width: 23rem;
	height: 100%;
}



/**
 * Tomato
 */
.v-home-page > .-tomato-container > .-tomato{
	max-width: 100%;
	width: 100%;
	height: 85%;

	background-image:
		linear-gradient(to bottom, var(--m-red-a400), var(--m-red-900)),
		url('./@resources/images/noise.png'),
		url('./@resources/images/noise.png');
	background-blend-mode: overlay;
	background-repeat: repeat;

	border-radius: 20px;

	box-shadow: 0 8px 15px -3px rgba(0,0,0,0.4);
}
.v-home-page > .-tomato-container > .-tomato > .-content{
	display: grid;
	grid-template-rows: minmax(auto, 100%) minmax(auto, 100%) 1fr minmax(auto, 100%);
	grid-template-columns: 1fr;
	grid-template-areas:
		'current'
		'timer'
		'next'
		'create';

	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;

	border-radius: 20px;

	overflow: hidden;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-current{
	grid-area: current;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-timer{
	grid-area: timer;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-next{
	grid-area: next;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-create-new-box{
	grid-area: create;
}

.v-home-page > .-tomato-container > .-tomato::after{
	content: '';
	pointer-events: none;
	position: absolute;
	top: -4px;
	left: 2px;
	width: calc(100% - 4px);
	height: calc(100% - 4px);
	border-radius: 20px;
	border: 3px solid var(--m-grey-800);
	z-index: 2;
}



/**
 * Current task
 */
.v-home-page > .-tomato-container > .-tomato > .-content > .-current{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-current > .-task{
	width: 100%;
}



/**
 * Next tasks
 */
.v-home-page > .-tomato-container > .-tomato > .-content > .-next{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.v-home-page > .-tomato-container > .-tomato > .-content > .-next > .-tasks{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	overflow-y: auto;
}
.v-home-page > .-tomato-container > .-tomato > .-content > .-next > .-tasks > .-task{
	width: 100%;
}



/**
 * Create new task
 */
.v-home-page > .-tomato-container > .-tomato > .-content > .-create-new-box{
	background-color: var(--m-grey-500);
	box-shadow: 0 -16px 10px -7px rgba(0,0,0,0.13);
}

</style>
