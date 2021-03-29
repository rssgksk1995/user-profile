<template>
	<div data-app>
		<v-layout row justify-center>
			<v-dialog v-model="showDialog" persistent max-width="290">
				<v-card class="usr-info" color="#9b9b9b" max-width="344">
					<v-icon class="close-icon" @click="closeThisModal">mdi-close</v-icon>
					<v-card-text>
						<v-avatar>
							<img :src="selectedUser.avatar" alt="" />
						</v-avatar>
						<div class="usr-details-cntr">
							<div class="usr-details">
							{{ selectedUser.first_name + " " + selectedUser.last_name }}
						</div>
						<div class="usr-details">{{ selectedUser.email }}</div>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>
<script>
export default {
	props: {
		showDialog: {
			default: false
		},
		selectedUser: { default: {} }
	},
	methods: {
		closeThisModal() {
			this.$emit('clicked', '')
		}
	}
};
</script>
<style lang="scss" scoped>
.usr-info {
	padding: 20px !important;
	position: relative;
}
.usr-details {
	color: black !important;
	font-weight: 600;
}
.close-icon {
	position: absolute !important;
	right: 5px;
	top: 0px;
	cursor: pointer;
}
.usr-details-cntr{
	margin-top: 15px
}
</style>
