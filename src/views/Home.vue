<template>
	<v-card>
		<v-tabs color="deep-purple accent-4" right>
			<v-tab>List View</v-tab>
			<v-tab>Card View</v-tab>
			<v-tab-item>
				<v-row>
					<v-col cols="12" sm="6" md="2"
						><v-btn
							depressed
							color="#ff7f50"
							class="new-user"
							@click="addNewUser"
						>
							Add new user
						</v-btn></v-col
					>
					<v-spacer></v-spacer>
					<v-col cols="12" sm="6" md="3" class="text-light mt-3">
						<v-text-field
							label="Search"
							clearable
							v-model="searchKeyword"
							:value="searchKeyword"
							@input="searchUserName"
						></v-text-field> </v-col
				></v-row>

				<v-container fluid>
					<v-simple-table fixed-header height="70vh">
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">Id</th>
									<th class="text-left">Image</th>
									<th class="text-left">Name</th>
									<th class="text-left">Email</th>
									<th class="text-left">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in currentUserList" :key="item.name">
									<td @click.stop="enableUserInfoModal(item)">{{ item.id }}</td>
									<td @click.stop="enableUserInfoModal(item)">
										<v-list-item-avatar color="grey darken-3">
											<v-img
												class="elevation-6"
												alt="Avator"
												:src="item.avatar"
											></v-img>
										</v-list-item-avatar>
									</td>
									<td @click.stop="enableUserInfoModal(item)">
										{{ item.first_name + " " + item.last_name }}
									</td>
									<td @click.stop="enableUserInfoModal(item)">
										{{ item.email }}
									</td>
									<td>
										<v-icon class="mr-3" @click.stop="openEditModal(item.id)"
											>mdi-pencil</v-icon
										>
										<v-icon class="mr-3" @click.stop="openDeleteModal(item.id)"
											>mdi-delete</v-icon
										>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
					<div class="load-more" v-if="isNextAvailable">
						<span @click="infiniteHandler" class="cursor"> Load More </span>
					</div>
				</v-container>
			</v-tab-item>
			<v-tab-item>
				<v-row>
					<v-col cols="12" sm="6" md="9"></v-col>
					<v-col cols="12" sm="6" md="3" class="text-light mt-3">
						<v-text-field
							label="Search"
							clearable
							v-model="searchKeyword"
							:value="searchKeyword"
							@input="searchUserName"
						></v-text-field> </v-col
				></v-row>
				<v-container fluid>
					<v-row class="user-row-data">
						<v-col
							v-for="item in currentUserList"
							:key="item.name"
							cols="12"
							xs="12"
							sm="6"
							md="4"
						>
							<v-card
								color="#2c663f"
								dark
								max-width="400"
								@click.stop="enableUserInfoModal(item)"
							>
								<v-row class="user-cards">
									<v-col cols="12" xs="6" sm="4" md="3">
										<v-list-item-avatar>
											<v-img
												class="elevation-6"
												alt=""
												:src="item.avatar"
											></v-img>
										</v-list-item-avatar>
									</v-col>
									<v-col cols="12" xs="6" sm="8" md="9">
										<div class="user-details">
											{{ item.first_name + " " + item.last_name }}
										</div>
										<div class="user-details">{{ item.email }}</div>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
						<v-col cols="12" xs="12">
							<div class="load-more" v-if="isNextAvailable">
								<span @click="infiniteHandler" class="cursor"> Load More </span>
							</div>
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
		<UserInfoModal
			:showDialog.sync="dialog"
			:selectedUser="selectedUser"
			@clicked="onUserInfoModalClose"
		/>
		<DeleteConfirmationModal
			:showDeleteConfirmationDialog.sync="enableDeleteDialog"
			@yesDeleteThisRecord="yesDeleteThisRecord"
			@closeDeleteModal="closeDeleteModal"
		/>
		<EditConfirmationModal
			:showEditConfirmationDialog.sync="enableEditDialog"
			@yesEditThisRecord="yesEditThisRecord"
			@closeEditModal="closeEditModal"
		/>
	</v-card>
</template>

<script>
import UserInfoModal from "../components/Modal/UserInfoModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import EditConfirmationModal from "../components/Modal/EditConfirmationModal";

export default {
	name: "Home",
	components: {
		UserInfoModal,
		DeleteConfirmationModal,
		EditConfirmationModal
	},
	data: () => ({
		commonToastTimeout: 5000,
		isError: false,
		submitFormErrorMsg: "",
		currentUserList: [],
		allUserListForSearch: [],
		isNextAvailable: false,
		nextPageNumber: "",
		isDataLoading: false,
		searchKeyword: "",
		dialog: false,
		selectedUser: {},
		enableDeleteDialog: false,
		selectedUserIdToDelete: "",
		enableEditDialog: false,
		selectedUserIdToEdit: ""
	}),
	mounted() {
		this.getUsers();
	},

	methods: {
		getUsers() {
			const savedUsers = this.$store.state.user.userData;
			if (savedUsers.length) {
				const currentPage = this.$store.state.user.currentPage;
				const totalPage = this.$store.state.user.totalPage;
				if (savedUsers.length) {
					savedUsers.forEach(element => {
						this.currentUserList.push(element);
					});
					this.allUserListForSearch = this.currentUserList;
					this.setNextPage(currentPage, totalPage);
				}
			} else {
				let payload = "page=1";
				this.$store
					.dispatch("user/getUserData", payload)
					.then(() => {
						const userList = this.$store.state.user.userData;
						const currentPage = this.$store.state.user.currentPage;
						const totalPage = this.$store.state.user.totalPage;
						if (userList.length) {
							userList.forEach(element => {
								this.currentUserList.push(element);
							});
							this.allUserListForSearch = this.currentUserList;
							this.setNextPage(currentPage, totalPage);
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		setNextPage(currentPageNumber, totalPageNumber) {
			if (totalPageNumber - currentPageNumber >= 1) {
				this.isNextAvailable = true;
				this.nextPageNumber = totalPageNumber;
			} else {
				this.isNextAvailable = false;
				this.nextPageNumber = "";
			}
		},
		infiniteHandler() {
			if (this.isNextAvailable) {
				this.isDataLoading = true;
				let payload = `page=${this.nextPageNumber}`;
				this.$store
					.dispatch("user/getMoreUserData", payload)
					.then(() => {
						this.currentUserList = [];
						const userList = this.$store.state.user.userData;
						const currentPage = this.$store.state.user.currentPage;
						const totalPage = this.$store.state.user.totalPage;
						userList.forEach(element => {
							this.currentUserList.push(element);
						});
						this.allUserListForSearch = this.currentUserList;
						this.setNextPage(currentPage, totalPage);
						this.isDataLoading = false;
					})
					.catch(err => {
						console.log(err);
						this.isDataLoading = false;
					});
			} else {
				this.isDataLoading = false;
			}
		},
		searchUserName() {
			let keyword = this.searchKeyword;
			let userList = this.allUserListForSearch;
			let newUserList = [];
			if (keyword) {
				userList.forEach(item => {
					if (
						item.first_name.includes(keyword) ||
						item.last_name.includes(keyword) ||
						item.email.includes(keyword)
					) {
						newUserList.push(item);
					}
				});
			} else {
				newUserList = userList;
			}
			this.currentUserList = newUserList;
		},
		enableUserInfoModal(usr) {
			this.dialog = true;
			this.selectedUser = usr;
		},
		onUserInfoModalClose() {
			this.dialog = false;
			this.selectedUser = {};
		},
		openDeleteModal(usrId) {
			this.enableDeleteDialog = true;
			this.selectedUserIdToDelete = usrId;
		},
		closeDeleteModal() {
			this.enableDeleteDialog = false;
			this.selectedUserIdToDelete = "";
		},
		yesDeleteThisRecord() {
			let payload = this.selectedUserIdToDelete;
			this.$store
				.dispatch("user/deleteUserData", payload)
				.then(() => {
					this.currentUserList = [];
					const userList = this.$store.state.user.userData;
					userList.forEach(element => {
						this.currentUserList.push(element);
					});
					this.allUserListForSearch = this.currentUserList;
					this.closeDeleteModal();
				})
				.catch(err => {
					console.log(err);
					this.closeDeleteModal();
				});
		},
		openEditModal(usrId) {
			this.enableEditDialog = true;
			this.selectedUserIdToEdit = usrId;
		},
		closeEditModal() {
			this.enableEditDialog = false;
			this.selectedUserIdToEdit = "";
		},
		yesEditThisRecord() {
			let userId = this.selectedUserIdToEdit;
			this.$router.push({
				path: `user/edit/${userId}`
			});
			this.closeEditModal();
		},
		addNewUser() {
			this.$router.push({
				path: `user/add`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.user-cards {
	padding: 10px !important;
	margin: 10px !important;
	text-align: left;
}
.user-details {
	margin-top: 5px;
}
.load-more {
	color: #ffffff;
	text-align: center;
}
.cursor {
	cursor: pointer;
}
.user-row-data {
	height: 74vh;
	overflow-y: scroll;
}
.new-user {
	margin-top: 10px;
}
</style>
