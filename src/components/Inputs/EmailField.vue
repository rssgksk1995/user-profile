<template>
	<v-text-field
		:label="fieldLabel"
		v-model="localValue"
		:value="localValue"
		@input="chanageUserName"
		:rules="emailRules"
	></v-text-field>
</template>
<script>
export default {
	props: {
		fieldValue: {
			default: ""
		},
    fieldLabel: {
			default: "Email"
		}
	},
	data() {
		return {
			localValue: this.fieldValue,
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+\..+/.test(v) || "E-mail must be valid"
			]
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
