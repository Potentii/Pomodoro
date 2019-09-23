<template>
	<div class="v-main-clock">

		<div class="-marker-container">
			<i class="-marker material-icons">arrow_drop_down</i>
		</div>

		<div class="-line"></div>
		<div class="-clock"
			  ref="clock"
			  :class="{
			  '--ticking': ticking,
			  '--live': live,
			  }"
			  :style="{
			  '--v-main-clock-animation-translate': -(duration_min * minute_width) + 'px',
			  '--v-main-clock-animation-offset' : !duration || !offset ? '0px' : -(offset / duration) * duration_min * minute_width + 'px',
			  '--v-main-clock-animation-duration': ((duration - offset) / 1000) + 's'
			  }">

			<div class="-fade --left"></div>
			<ul class="-minutes">
				<li class="-minute"
					 :key="minute"
					 :class="{ '--bigger': minute % 5 == 0 || minute == 0 || minute == duration_min }"
					 v-for="(_, minute) in duration_min + 1">
					<div class="-label-container">
						<span class="-label" v-if="minute % 5 == 0 || minute == 0 || minute == duration_min">{{ minute }}</span>
					</div>
				</li>
			</ul>

			<div class="-fade --right"></div>

		</div>

	</div>
</template>



<script>
export default {

	name: 'v-main-clock',


	props: {
		'duration': {
			type: Number,
			required: false,
			default: 0
		},

		'offset': {
			type: Number,
			required: false,
			default: 0
		}
	},


	data(){
		return {
			ticking: false,
			live: false,
			minute_width: 3 /* minute marker */ + 8 /* minute spacing */
		};
	},


	computed: {

		duration_min(){
			if(!this.duration)
				return 0;
			return this.duration / (1000 * 60);
		},

		offset_min(){
			if(!this.offset)
				return 0;
			return this.offset / (1000 * 60);
		}

	},


	watch: {
		// offset(v){
		// 	this.initial = v;
		// }
	},


	beforeMount(){
		this.stop();
	},


	mounted(){
		this.clock_width = !!this.$refs.clock ? this.$refs.clock.offsetWidth : 0;
	},



	methods: {

		start(){
			this.ticking = true;
			this.live = true;
		},

		pause(){
			this.ticking = false;
		},

		stop(){
			this.live = false;
			this.ticking = false;
		}

	},
}
</script>



<style>
.v-main-clock{
	display: flex;
	flex-direction: column;
	/*align-items: stretch;*/
	/*width: 100%;*/
	/*max-width: 100%;*/
}
.v-main-clock > *{
	max-width: 100%;
}
.v-main-clock > .-marker-container{
	opacity: 0.9;
	display: flex;
	justify-content: center;
}
.v-main-clock > .-marker-container > .-marker{
	font-size: 22px;
	color: var(--m-grey-50);
}

.v-main-clock > .-line{
	opacity: 0.3;
	height: 2px;
	background-color: var(--m-grey-50);
}


.v-main-clock > .-clock{
	overflow-x: hidden;
	overflow-y: hidden;
	height: 2.3em;
	width: 100%;
	max-width: 100%;
	min-width: 100%;
}

.v-main-clock > .-clock > .-fade{
	--fade-color: var(--m-red-a400) 20%, rgba(255, 255, 255, 0) 80%;
	opacity: 0.6;
	position: absolute;
	width: 15px;
	height: 100%;
	top: 0;
	z-index: 2;
}
.v-main-clock > .-clock > .-fade.--left{
	left: 0;
	background-image: radial-gradient(at left center, var(--fade-color));
}
.v-main-clock > .-clock > .-fade.--right{
	right: 0;
	background-image: radial-gradient(at right center, var(--fade-color));
}

.v-main-clock > .-clock > .-minutes{
	opacity: 0.9;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-top: 0.5em;
	padding-left: calc(50% - 2px);
	/*left: 50%;*/

	/*animation-name: v-main-clock-timer-animation;*/
	animation-duration: var(--v-main-clock-animation-duration);
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	animation-timing-function: linear;
	transform: translateX(var(--v-main-clock-animation-offset));
}

.v-main-clock > .-clock.--ticking > .-minutes{
	animation-play-state: running;
}
.v-main-clock > .-clock:not(.--ticking) > .-minutes{
	animation-play-state: paused;
}

.v-main-clock > .-clock.--live > .-minutes{
	animation-name: v-main-clock-timer-animation;
}
.v-main-clock > .-clock:not(.--live) > .-minutes{
	animation-name: unset;
}

@keyframes v-main-clock-timer-animation {
	to{
		/*transform: translateX(calc(-100% + calc(var(--v-main-clock-width) / 2)));*/
		transform: translateX(var(--v-main-clock-animation-translate));
	}
}


.v-main-clock > .-clock > .-minutes > .-minute{
	flex-shrink: 0;
	width: 3px;
	height: 3px;
	background-color: var(--m-grey-50);
	border-radius: 3px;
}
.v-main-clock > .-clock > .-minutes > .-minute + .-minute{
	margin-left: 0.5em;
}

.v-main-clock > .-clock > .-minutes > .-minute.--bigger{
	height: 8px;
}

.v-main-clock > .-clock > .-minutes > .-minute > .-label-container{
	opacity: 0.9;
	position: absolute;
	display: flex;
	justify-content: center;
	top: 12px;
	left: 0;
	width: 100%;
}

.v-main-clock > .-clock > .-minutes > .-minute > .-label-container > .-label{
	font-size: 0.75em;
}
</style>
