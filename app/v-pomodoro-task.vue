<template>
	<v-pomodoro-list-item class="v-pomodoro-task">
		<span class="-name">{{ task.title ? task.title : (task.type.includes('INTERVAL') ? 'Interval' : null) }}</span>
	</v-pomodoro-list-item>
</template>



<script>
import VPomodoroListItem from './@components/v-pomodoro-list-item';
import Task              from './board/task/task';



export default {
   name: 'v-pomodoro-task',


	components: { VPomodoroListItem },


	props: {
		/**
		 * @type {Task}
		 */
		'task': {
   		type: Task,
			required: true
		}
	}

}
</script>



<style>
.v-pomodoro-task{
	padding: 1.2em 1.5em;
}
</style>
