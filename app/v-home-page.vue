<template>
	<div class="v-home-page">


		<div class="-tomato-container">

			<div class="-tomato">

				<div class="-current">

					<v-pomodoro-task class="-task" :key="pomodoro._id" :task="pomodoro"></v-pomodoro-task>

<!--					<div class="-task" v-if="pomodoro">-->
<!--						<span class="-name">{{ pomodoro.name }}</span>-->
<!--					</div>-->

				</div>

				<div class="-timer">

					<div class="-marker-container">
<!--						<div class="-fake-marker"></div>-->
						<i class="-marker material-icons">arrow_drop_down</i>
					</div>

					<div class="-line"></div>

					<div class="-clock" ref="clock" :style="{ '--clock-animation-duration': (pomodoro_minutes * 0.5) + 's', '--clock-width': tomato_width + 'px' }">

						<div class="-fade --left"></div>

						<ul class="-minutes">
							<li class="-minute"
								 :key="minute"
								 :class="{ '--bigger': minute % 5 == 0 || minute == 0 || minute == pomodoro_minutes }"
								 v-for="(_, minute) in pomodoro_minutes + 1">
								<div class="-label-container">
									<span class="-label" v-if="minute % 5 == 0 || minute == 0 || minute == pomodoro_minutes">{{ minute }}</span>
								</div>
							</li>
						</ul>

						<div class="-fade --right"></div>

					</div>

				</div>

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
</template>



<script>
import VPomodoroTask from './v-pomodoro-task';
import PomodoroTask  from './pomodoro-task';



export default {

	name: 'v-home-page',


	components: { VPomodoroTask },


	data(){
		return {
			pomodoro: new PomodoroTask('1', 'Tarefa 1', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),

			tasks: [
				new PomodoroTask('2', 'Tarefa 2', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('21', null, PomodoroTask.TYPES.SHORT_INTERVAL, 1000 * 60 * 5),
				new PomodoroTask('3', 'Tarefa 3', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('31', null, PomodoroTask.TYPES.SHORT_INTERVAL, 1000 * 60 * 5),
				new PomodoroTask('4', 'Tarefa 4', PomodoroTask.TYPES.POMODORO, 1000 * 60 * 25),
				new PomodoroTask('41', null, PomodoroTask.TYPES.LONG_INTERVAL, 1000 * 60 * 30),
			],

			tomato_width: 0
		};
	},


	computed: {

		pomodoro_minutes(){
			if(!this.pomodoro)
				return 0;
			return this.pomodoro.duration_min;
		}

	},


	mounted(){
		this.tomato_width = !!this.$refs.clock ? this.$refs.clock.offsetWidth : 0;
	},



	methods: {



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


.v-home-page > .-tomato-container > .-tomato{
	/*display: flex;*/
	/*flex-direction: column;*/
	/*align-items: stretch;*/
	/*justify-content: flex-start;*/
	display: grid;
	grid-template-rows: auto auto 1fr auto;
	grid-template-columns: auto;
	grid-template-areas:
		'current'
		'timer'
		'next'
		'create';


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
.v-home-page > .-tomato-container > .-tomato > .-current{
	grid-area: current;
	/*flex-grow: 1;*/
	/*flex-shrink: 0;*/
}
.v-home-page > .-tomato-container > .-tomato > .-timer{
	grid-area: timer;
	/*flex-grow: 1;*/
	/*flex-shrink: 0;*/
}
.v-home-page > .-tomato-container > .-tomato > .-next{
	grid-area: next;
	/*flex-shrink: 1;*/
	/*flex-grow: 1;*/
}
.v-home-page > .-tomato-container > .-tomato > .-create-new-box{
	grid-area: create;
	/*flex-grow: 1;*/
	/*flex-shrink: 0;*/
}


.v-home-page > .-tomato-container > .-tomato::after{
	content: '';
	pointer-events: none;
	position: absolute;
	top: -3px;
	left: 3px;
	width: calc(100% - 5px);
	height: calc(100% - 5px);
	border-radius: 20px;
	border: 3px solid var(--m-grey-800);
	z-index: 2;
}


.v-home-page > .-tomato-container > .-tomato > .-current{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	overflow: hidden;
	/*padding: 1.2em;*/
}
.v-home-page > .-tomato-container > .-tomato > .-current > .-task{
	width: 100%;
}



.v-home-page > .-tomato-container > .-tomato > .-timer{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-home-page > .-tomato-container > .-tomato > .-timer > .-marker-container{
	opacity: 0.9;
	display: flex;
	justify-content: center;
}
.v-home-page > .-tomato-container > .-tomato > .-timer > .-marker-container > .-marker{
	font-size: 22px;
	color: var(--m-grey-50);
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-line{
	opacity: 0.3;
	height: 2px;
	background-color: var(--m-grey-50);
}


.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock{
	/*opacity: 0.9;*/
	overflow-x: hidden;
	overflow-y: hidden;
	height: 2.3em;
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-fade{
	--fade-color: var(--m-red-a400) 20%, rgba(255, 255, 255, 0) 80%;
	opacity: 0.6;
	position: absolute;
	width: 15px;
	height: 100%;
	top: 0;
	z-index: 2;
}
.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-fade.--left{
	left: 0;
	background-image: radial-gradient(at left center, var(--fade-color));
}
.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-fade.--right{
	right: 0;
	background-image: radial-gradient(at right center, var(--fade-color));
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes{
	opacity: 0.9;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: max-content;
	padding-top: 0.5em;
	/*margin-right: 0;*/
	padding-left: 50%;
	/*padding-right: 50%;*/

	animation-name: -clock-animation;
	animation-duration: var(--clock-animation-duration);
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	animation-timing-function: linear;
	transform: translateX(0);
	/*left: 0;*/
}

@keyframes -clock-animation {
	to{
		transform: translateX(calc(-100% + calc(var(--clock-width) / 2)));
	}
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes > .-minute{
	flex-shrink: 0;
	width: 3px;
	height: 3px;
	background-color: var(--m-grey-50);
	border-radius: 3px;
}
.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes > .-minute + .-minute{
	margin-left: 0.5em;
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes > .-minute.--bigger{
	height: 8px;
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes > .-minute > .-label-container{
	opacity: 0.9;
	position: absolute;
	display: flex;
	justify-content: center;
	top: 12px;
	left: 0;
	width: 100%;
}

.v-home-page > .-tomato-container > .-tomato > .-timer > .-clock > .-minutes > .-minute > .-label-container > .-label{

	/*display: block;*/
	/*padding: 0.3em;*/


	font-size: 0.75em;
	/*margin: 0 auto;*/
	/*transform: translate(100%, 1em);*/
}


.v-home-page > .-tomato-container > .-tomato > .-next{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.v-home-page > .-tomato-container > .-tomato > .-next > .-tasks{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	overflow-y: auto;
}
.v-home-page > .-tomato-container > .-tomato > .-next > .-tasks > .-task{
	width: 100%;
}


.v-home-page > .-tomato-container > .-tomato > .-create-new-box{
	height: 7rem;
	background-color: var(--m-grey-500);

	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;

	box-shadow: 0 -16px 10px -7px rgba(0,0,0,0.13);
}

</style>
