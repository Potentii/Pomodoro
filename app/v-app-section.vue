<template>
	<div class="v-app-section">

		<!-- * Header * -->
		<header class="-header">

		</header>


		<!-- * Main section * -->
		<main class="-main">
			<router-view class="-route"/>
		</main>

	</div>
</template>



<script>


export default {

   name: 'v-app-section',

}
</script>



<style>
.v-app-section{
	display: flex;
	flex-direction: column;
	align-items: center;

   width: 100%;
   height: 100%;
	max-height: 100%;

	/*background-color: var(--m-grey-800);*/

	background-color: var(--blank-bg--base);
	background-image: url('./@resources/images/noise.png');
	background-blend-mode: overlay;
	background-repeat: repeat;
	background-size: 66px;
}



.v-app-section > .-header{
	flex-shrink: 0;
	width: 100%;
	z-index: 2;
}



.v-app-section > .-main{
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;

	overflow-y: auto;
	overflow-x: hidden;
}
.v-app-section > .-main > .-route{
	width: 100%;
}
</style>
