<template>
	<div class="container">
		<v-row>
			<v-col cols="12" sm="12">
				<HeadingComponent headingText="User Page" />
			</v-col>
			<v-col cols="12" sm="12">
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-row>
						<v-col cols="12" sm="12" md="4">
							<TextField
								fieldLabel="First Name"
								:fieldValue="firstName"
								@onInputChange="onFirstNameChange"
							/>
						</v-col>
						<v-col cols="12" sm="12" md="4">
							<TextField
								fieldLabel="Last Name"
								:fieldValue="lastName"
								@onInputChange="onLastNameChange"
							/>
						</v-col>
						<v-col cols="12" sm="12" md="4">
							<EmailField
								fieldLabel="Email"
								:fieldValue="email"
								@onInputChange="onEmailChange"
							/>
						</v-col>
						<v-col cols="12" sm="12" md="4">
							<MobileField
								fieldLabel="Phone"
								:fieldValue="mobile"
								@onInputChange="onMobileChange"
							/>
						</v-col>
						<v-col cols="12" sm="12" md="4">
							<DropdownComp
								fieldLabel="Gender"
								:fieldItems="genderOptions"
								@onDropdownChange="onGenderDropdownChange"
							/>
						</v-col>
						<v-col cols="12" sm="12" md="4">
							<DropdownComp
								fieldLabel="Qualification"
								:fieldItems="qualificationOptions"
								:isMultpleAllowed="allowMultiple"
								@onDropdownChange="onDropdownChange"
							/>
						</v-col>
						<v-col cols="12" sm="12"
							><v-btn color="#ff7f50" class="mr-4" @click="validate">
								Add User
							</v-btn></v-col
						>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import HeadingComponent from "../components/TextComponents/HeadingComponent";
import TextField from "../components/Inputs/TextField";
import EmailField from "../components/Inputs/EmailField";
import MobileField from "../components/Inputs/MobileField";
import DropdownComp from "../components/Dropdown/SingleSelect";
import { GENDER, QUALIFICATION_OPTIONS } from "@/config";

export default {
	name: "UserPage",
	components: {
		HeadingComponent,
		TextField,
		EmailField,
		MobileField,
		DropdownComp
	},
	data: () => ({
		valid: true,
		commonToastTimeout: 5000,
		genderOptions: GENDER,
		qualificationOptions: QUALIFICATION_OPTIONS,
		allowMultiple: true,
		firstName: "",
		lastName: "",
		selectedGender: "",
		selectedQualification: "",
		mobile: "",
		email: ""
	}),

	methods: {
		validate() {
			this.$refs.form.validate();
			if (this.$refs.form.validate()) {
				this.addUserDetails();
			}
		},
		onDropdownChange(value) {
			this.selectedQualification = value;
		},
		onGenderDropdownChange(value) {
			this.selectedGender = value;
		},
		onFirstNameChange(value) {
			this.firstName = value;
		},
		onLastNameChange(value) {
			this.lastName = value;
		},
		onEmailChange(value) {
			this.email = value;
		},
		onMobileChange(value) {
			this.mobile = value;
		},
		addUserDetails() {
			let payload = {
        id: '',
				first_name: this.firstName,
				last_name: this.lastName,
				gender: this.selectedGender,
				qualification: this.selectedQualification,
				mobile: this.mobile,
				email: this.email
			};
			this.$store
				.dispatch("user/addUserData", payload)
				.then(() => {
					this.$router.push({ name: "Home" });
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>
<style lang="scss">
.login-container {
	height: 20rem;
	width: 30rem;
	border-radius: 10px;
	background-color: rgba(33, 33, 33, 0.3);
	padding: 10px 30px;
}
.container {
	display: flex;
	justify-content: center;
	// background-color: rgba(33, 33, 33, 0.3);
}
</style>
