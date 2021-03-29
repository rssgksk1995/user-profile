<template>
	<v-text-field
		:label="fieldLabel"
		v-model="localValue"
		:value="localValue"
		@input="chanageUserName"
		:rules="numberRule"
	></v-text-field>
</template>
<script>
export default {
	props: {
		fieldValue: {
			default: ""
		},
		fieldLabel: {
			default: "Mobile"
		}
	},
	data() {
		return {
			localValue: this.fieldValue,
			numberRule: [v => !!v || "Required"]
		};
	},
	watch: {
		fieldValue: function () {
			this.localValue = this.fieldValue;
		}
	},
	methods: {
		chanageUserName() {
			this.$emit("onInputChange", this.localValue);
		}
	}
};
</script>
<style lang="scss" scoped></style>
