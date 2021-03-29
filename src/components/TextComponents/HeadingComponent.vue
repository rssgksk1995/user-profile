<template>
	<div>
		<p class="heading">{{ headingText }}</p>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: ["headingText"]
};
</script>
<style lang="scss" scoped>
.heading {
	font-size: 20px;
}
</style>
