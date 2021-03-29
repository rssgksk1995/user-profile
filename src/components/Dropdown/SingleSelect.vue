<template>
	<div data-app>
		<v-select
			:items="fieldItems"
			:label="fieldLabel"
			v-model="selectedVal"
			class="custom-input-field"
			item-text="label"
			item-value="value"
			:rules="commonTextInputRules"
			@change="onDropdownChange"
			required
			:multiple="isMultpleAllowed"
      :menu-props="{ maxHeight: '400', maxWidth: '300' }"
		></v-select>
	</div>
</template>
<script>
export default {
	props: {
		fieldItems: {
			default: function () {
				return [];
			}
		},
		fieldLabel: {
			default: ""
		},
		isMultpleAllowed: {
			default: false
		}
	},
	data() {
		return {
			selectedVal: [],
			commonTextInputRules: [v => !!v || "Required"]
		};
	},
	methods: {
		onDropdownChange() {
      this.$emit("onDropdownChange", this.selectedVal);
		},
	}
};
</script>
<style lang="scss" scoped></style>
