<template>
	<div data-app>
		<v-layout row justify-center>
			<v-dialog
				v-model="showEditConfirmationDialog"
				persistent
				max-width="290"
			>
				<v-card class="usr-info" color="#9b9b9b" max-width="344">
					<v-icon class="close-icon" @click="closeThisModal">mdi-close</v-icon>
					<v-card-text>
            <HeadingComponent headingText="Are you sure to edit this record" />
						<div class="usr-details-cntr">
              <v-btn
                depressed
                color="#2c663f"
                @click="editThisRecord"
              >
                Yes
              </v-btn>
              <v-btn
                depressed
                color="primary"
                @click="closeThisModal"
              >
                No
              </v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>
<script>
import HeadingComponent from "../TextComponents/HeadingComponent";

export default {
	props: {
		showEditConfirmationDialog: {
			default: false
		}
	},
  components: {
		HeadingComponent
	},
	methods: {
		closeThisModal() {
			this.$emit("closeEditModal", "");
		},
		editThisRecord() {
			this.$emit("yesEditThisRecord", "");
		}
	}
};
</script>
<style lang="scss" scoped>
.usr-info {
	padding: 20px !important;
	position: relative;
  color: white !important;
}
.close-icon {
	position: absolute !important;
	right: 5px;
	top: 0px;
	cursor: pointer;
}
.usr-details-cntr {
	margin-top: 30px;
	display: flex;
	justify-content: space-evenly;
}
</style>
