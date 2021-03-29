<template>
	<div id="app">
		<v-container class="mt-4">
			<router-view />
		</v-container>
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ffffff;
	background-image: url("../src/assets/unsplash.jpg");
	min-height: 100vh;
}
.v-input input {
	color: #ffffff !important;
}
</style>
