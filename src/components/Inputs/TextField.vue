<template>
	<v-text-field
		:label="fieldLabel"
		v-model="localValue"
		:value="localValue"
		@input="chanageUserName"
		:rules="commonTextInputRules"
	></v-text-field>
</template>
<script>
export default {
	props: {
		fieldValue: {
			default: ""
		},
		fieldLabel: {
			default: ""
		}
	},
	data() {
		return {
			localValue: this.fieldValue,
			commonTextInputRules: [v => !!v || "Required"]
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
