<template>
	<div class="v-home-page">

		<div class="-tomato-container" v-if="current_board">

         <span class="-title" v-if="current_board">{{ current_board.name }}</span>

			<div class="-tomato">

            <div class="-start-card --big-card" v-if="current_board && !current_board.current_task && current_board.not_started_tasks.length">

               <!-- * Pomodoro starter * -->
               <div class="-starter">

                  <span class="-text"><i>Start</i> this pomodoro</span>


                  <button class="-play" type="button" @click="startPomodoro_onClick">
                     <i class="-icon material-icons">play_arrow</i>
                  </button>

               </div>

            </div>

            <div class="-main-card --big-card">

               <!-- * Current pomodoro * -->
               <div class="-current" v-if="current_board.current_task">
                  <span class="-title --section-title"><span class="-text">Current</span></span>
<!--                  <v-pomodoro-task class="-task" :task="current_board.current_task"></v-pomodoro-task>-->
                  <div class="-pomodoro">
                     <button class="-time-control -pause material-icons" v-if="current_board.current_task.isRunning()">pause</button>
                     <button class="-time-control -play material-icons" v-else>play_arrow</button>
                     <span class="-title">{{ current_board.current_task.title || (current_board.current_task.type.includes('INTERVAL') ? 'Interval' : null) }}</span>
                  </div>
               </div>


               <!-- * Timer * -->
               <v-main-clock class="-timer" ref="clock" v-show="current_board.current_task" :offset="current_board.current_task ? current_board.current_task.elapsed_time : 0" :duration="current_board.current_task ? current_board.current_task.duration : null"></v-main-clock>


               <!-- * Next pomodoros * -->
               <div class="-next">
                  <span class="-title --section-title"><span class="-text">Next tasks</span></span>
                  <ul class="-tasks --thin-scroll">
                     <v-pomodoro-task class="-task" :key="task._id" :task="task" v-for="task in current_board.not_started_tasks"></v-pomodoro-task>
                  </ul>
               </div>

            </div>


            <div class="-create-task-card --big-card" v-if="false">

               <!-- * Create new pomodoro * -->
               <div class="-create-new-box">
               </div>

            </div>

         </div>

		</div>

	</div>
</template>



<script>
import VPomodoroTask            from './v-pomodoro-task';
import VMainClock               from './v-main-clock';
import { mapActions, mapState } from 'vuex';
import BoardRoot                from './board/board-root';
import Task                     from './board/task/task';
import Board                    from './board/board';



export default {

	name: 'v-home-page',


	components: { VMainClock, VPomodoroTask },


	data(){
		return {
		};
	},


   computed: {
		...mapState('board', [ 'boards', 'current_board' ]),
   },


	async mounted(){


		// const tasks = [
		// 	new Task('t1', 'Tarefa 1', 1000 * 60 * 5, Task.TYPES.POMODORO),
		// 	new Task('t1i', null, 1000 * 60 * 5, Task.TYPES.SHORT_INTERVAL),
		// 	new Task('t2', 'Tarefa 2', 1000 * 60 * 5, Task.TYPES.POMODORO),
		// 	new Task('t2i', null, 1000 * 60 * 5, Task.TYPES.SHORT_INTERVAL),
		// 	new Task('t3', 'Tarefa 3', 1000 * 60 * 5, Task.TYPES.POMODORO),
		// 	new Task('t3i', null, 1000 * 60 * 5, Task.TYPES.SHORT_INTERVAL),
		// 	new Task('t4', 'Tarefa 4', 1000 * 60 * 5, Task.TYPES.POMODORO),
		// 	new Task('ti', null, 1000 * 60 * 30, Task.TYPES.LONG_INTERVAL),
		// ];
      //
		// const board = new Board('b1', 'My new board', tasks);
      //
		// await BoardRoot.updateBoardsOnCache([ board ]);
		// await BoardRoot.setActiveBoardIdOnCache(board.id);

		await this.load();
	},


	methods: {
		...mapActions('board', [ 'loadAllBoards', 'loadActiveBoard', 'updateBoard', 'setBoardAsActive' ]),
		// ...mapActions('board/task', [ 'loadAllTasks', 'updateTasks', 'calculateTasksState' ]),


		async load(){
			await this.loadAllBoards();
			await this.loadActiveBoard();

			// TODO get the active one from the cache
			// if(this.boards && this.boards.length)
         //    await this.setBoardAsActive(this.boards[0]);

			// TODO update the boards states
         // this.calculateTasksState();

			if(this.current_board && this.current_board.current_task && this.current_board.current_task.isRunning())
				this.$refs.clock.start();
      },


		async startPomodoro_onClick(){
			await this.advanceToNextTask();
			await this.startCurrentTask();
      },
      
      
      async startCurrentTask(){
			if(!this.current_board?.current_task)
				throw new Error(`Cannot find current task to start`);

			// TODO check if the task is already finished?

			this.$refs.clock.start();

			console.log(this.current_board.current_task.remaining_time);

			setTimeout(async () => {
				await this.showNotification();
				await this.advanceToNextTask();
				await this.startCurrentTask();
         }, this.current_board.current_task.remaining_time);
      },
      
      
      async showNotification(){
			console.log('A fake notification');
      },


		async advanceToNextTask(){
			if(!this.current_board)
            throw new Error(`Cannot advance to next task: No active board`);

			const curr = this.current_board.current_task;
			if(curr)
				curr.setAsFinishedNow();


			const next = this.current_board.not_started_tasks[0];
			if(next)
				next.setAsStartedNow();

         await this.updateBoard(this.current_board);
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
	opacity: 0.9;
	margin: 1em 1.5em 0.3em 1.5em;
}
.v-home-page .--section-title > .-text{
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.09em;
	font-size: 12px;
   color: var(--m-grey-50);
   text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
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
   --var-card-border-radius: 23px;

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

   padding: 1.6em 1em 1.8em 1em;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-text{
   font-size: 17px;
   margin-bottom: 0.9em;
   text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-play{
   display: flex;
   align-items: center;
   justify-content: center;

   padding: 0.3em 2em;

   border: 1px var(--m-grey-50) solid;
   border-radius: 3em;

   transition: background-color 0.2s ease;
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-play:hover{
   background-color: rgba(255,255,255,0.2);
}
.v-home-page > .-tomato-container > .-tomato > .-start-card > .-starter > .-play:active{
   background-color: rgba(255,255,255,0.4);
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

   padding-bottom: var(--var-card-border-radius);
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

.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-pomodoro{
   display: flex;
   flex-direction: row;
   align-items: center;
   width: 100%;

   padding: 1em 1.5em;
}

.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-pomodoro > .-time-control{
   --var-size: 1.7em;
   display: flex;
   align-items: center;
   justify-content: center;

   width: var(--var-size);
   height: var(--var-size);

   margin-right: 1rem;

   border: 3px solid var(--m-grey-200);

   border-radius: 50%;

   transition: background-color, transform, 0.15s ease;
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-pomodoro > .-time-control:hover{
   background-color: rgba(255,255,255,0.2);
}
.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-pomodoro > .-time-control:active{
   transform: scale(0.98);
}

.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-pomodoro > .-title{
   font-family: 'Roboto Medium', sans-serif;
   font-size: 18px;
   letter-spacing: 0.06em;

   text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}
/*.v-home-page > .-tomato-container > .-tomato > .-main-card > .-current > .-task{*/
/*   width: 100%;*/
/*}*/


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

   padding-bottom: var(--var-card-border-radius);
}

.v-home-page > .-tomato-container > .-tomato > .-create-task-card > .-create-new-box{
   height: 6rem;
}
</style>
