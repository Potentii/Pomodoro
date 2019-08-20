<template>
	<li class="v-pomodoro-list-item">
		<slot></slot>
	</li>
</template>



<script>


export default {

   name: 'v-pomodoro-list-item',

}
</script>



<style>
.v-pomodoro-list-item{
	width: max-content;
	height: max-content;
	transition: background-color 0.2s ease;
}
.v-pomodoro-list-item:hover{
	background-color: rgba(255,255,255,0.08);
}


.v-pomodoro-list-item + .v-pomodoro-list-item::before{
	--margin: 1.5em;
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: calc(100% - calc(var(--margin) * 2));
	margin: 0 var(--margin);
	height: 1px;
	background-color: rgba(255,255,255,0.08);
}
</style>
