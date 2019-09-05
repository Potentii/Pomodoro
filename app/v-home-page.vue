<template>
	<div class="v-home-page">

		<div class="-tomato-container">

			<div class="-tomato">

            <div class="-start-card --big-card">

               <!-- * Pomodoro starter * -->
               <div class="-starter" v-if="!pomodoro && tasks">

                  <span class="-text"><i>Start</i> this pomodoro</span>


                  <button class="-play" type="button" @click="startPomodoro_onClick">
                     <i class="-icon material-icons">play_arrow</i>
                  </button>

               </div>

            </div>


            <div class="-main-card --big-card" v-if="true">

               <!-- * Current pomodoro * -->
               <div class="-current">
                  <template v-if="pomodoro">
                     <span class="-title --section-title"><span class="-text">Current</span></span>
                     <v-pomodoro-task class="-task" :task="pomodoro"></v-pomodoro-task>
                  </template>
                  <template v-else>
                     <!-- TODO show empty state, maybe a tutorial? -->
                  </template>
               </div>


               <!-- * Timer * -->
               <v-main-clock class="-timer" :duration="pomodoro ? pomodoro.duration_ms : null"></v-main-clock>


               <!-- * Next pomodoros * -->
               <div class="-next">
                  <span class="-title --section-title"><span class="-text">Next tasks</span></span>
                  <ul class="-tasks --thin-scroll">
                     <v-pomodoro-task class="-task" :key="task._id" :task="task" v-for="task in tasks"></v-pomodoro-task>
                  </ul>
               </div>

            </div>


            <div class="-create-task-card --big-card" v-if="true">

               <!-- * Create new pomodoro * -->
               <div class="-create-new-box" v-if="true">d
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
				new PomodoroTask('1', 'Tarefa 1', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 45),
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
		// this.advanceToNextTask();
	},


	methods: {

		startPomodoro_onClick(){
			this.advanceToNextTask();
		},


		advanceToNextTask(){
			const next = this.getFirstPomodoroTask();
			const last = this.getCurrentPomodoroTask();
			this.removeFirstPomodoroTask();
			if(last)
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

.v-home-page .--section-title{
	opacity: 0.8;
	/*color: var(--m-grey-200);*/
	margin: 1em 1.5em 0.3em 1.5em;
}
.v-home-page .--section-title > .-text{
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.09em;
	font-size: 12px;
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
   --var-card-border-radius: 20px;

   display: flex;
   flex-direction: column;
   align-items: stretch;

	max-width: 100%;
	width: 100%;
   min-height: 85%;
	height: 85%;
   max-height: 85%;

	border-radius: var(--var-card-border-radius);

	box-shadow: 0 8px 15px -3px rgba(0,0,0,0.4);

   overflow: hidden;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card{
   flex: 0 0 auto;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card{
   flex: 1 1 auto;
}
.v-home-page > .-tomato-container > .-tomato > .-create-task-card{
   flex: 0 0 auto;
}



.v-home-page > .-tomato-container > .-tomato > .--big-card{
   background-image:
      linear-gradient(to bottom, var(--var-big-card-start-color), var(--var-big-card-end-color)),
      url('./@resources/images/noise.png'),
      url('./@resources/images/noise.png');
   background-blend-mode: overlay;
   background-repeat: repeat;

   border-radius: var(--var-card-border-radius);
}
.v-home-page > .-tomato-container > .-tomato > .--big-card:not(:last-child){
   border-bottom-left-radius: 0;
   border-bottom-right-radius: 0;
}
.v-home-page > .-tomato-container > .-tomato > .--big-card:not(:last-child)::after{
   content: '';
   pointer-events: none;
   position: absolute;
   bottom: calc(var(--var-card-border-radius) * -1);
   left: 0;
   width: 100%;
   height: var(--var-card-border-radius);
   background-color: var(--var-big-card-end-color);
}
.v-home-page > .-tomato-container > .-tomato > .--big-card:not(:first-child){
   box-shadow: 0 -8px 12px -3px rgba(0,0,0,0.15);
}




/*
 * 'Start this pomodoro' card
 */
.v-home-page > .-tomato-container > .-tomato > .-start-card{
   --var-big-card-start-color: #81C784;
   --var-big-card-end-color: #00C853;

   display: flex;
   flex-direction: column;
   align-items: center;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter{
   display: flex;
   flex-direction: column;
   align-items: stretch;

   padding: 2.2em 1em;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-text{
   font-size: 1em;
   margin-bottom: 1.2em;
   text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-play{
   display: flex;
   align-items: center;
   justify-content: center;

   padding: 0.4em 2.8em;

   border: 1px var(--m-grey-50) solid;
   border-radius: 3em;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-play > .-icon{
   font-size: 2em;
   color: var(--m-grey-100);
   text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}




/*
 * 'Pomodoro content' card
 */
.v-home-page > .-tomato-container > .-tomato > .-main-card{
   --var-big-card-start-color: var(--m-red-a400);
   --var-big-card-end-color: var(--m-red-900);

   display: flex;
   flex-direction: column;
   align-items: stretch;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current{
   flex: 0 0 auto;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-timer{
   flex: 0 0 auto;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-next{
   flex: 1 1 auto;
}


/**
 * Current task
 */
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-task{
   width: 100%;
}


/**
 * Next tasks
 */
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-next{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-next > .-tasks{
   flex: 1 1 0; /* DO NOT REMOVE THE "ZERO" AT THE END, OTHERWISE THIS LIST WILL NOT SHRINK PROPERLY */
   display: flex;
   flex-direction: column;
   overflow-y: auto;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-next > .-tasks > .-task{
   width: 100%;
}




/*
 * 'New task' card
 */
.v-home-page > .-tomato-container > .-tomato > .-create-task-card{
   --var-big-card-start-color: var(--m-grey-100);
   --var-big-card-end-color: var(--m-grey-400);

   display: flex;
   flex-direction: column;
   align-items: stretch;
}

.v-home-page > .-tomato-container > .-tomato > .-create-task-card > .-create-new-box{
   height: 6rem;
}
</style>
