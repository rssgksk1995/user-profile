<template>
	<div class="container">
		<!-- <v-row no-gutters class="container"> -->
		<!-- <v-col cols="12" sm="12"> -->
		<div class="login-container">
			<HeadingComponent headingText="Log in" />
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="E-mail"
					required
				></v-text-field>
				<v-text-field
					v-model="password"
					:rules="passwordRules"
					label="Password"
					required
				></v-text-field>

				<v-btn color="#ff7f50" class="mr-4" @click="validate"> Log In </v-btn>
			</v-form>
		</div>
		<v-snackbar v-model="isError" :timeout="commonToastTimeout" color="error">
			<v-icon class="mr-3">mdi-checkbox-marked-circle</v-icon>
			{{ submitFormErrorMsg }}
		</v-snackbar>
	</div>
</template>

<script>
import HeadingComponent from "../components/TextComponents/HeadingComponent";
import { USER_EMAIL, USER_PASS } from "@/config";

export default {
	name: "LoginPage",
	components: {
		HeadingComponent
	},
	data: () => ({
		valid: true,
		email: "",
		emailRules: [
			v => !!v || "E-mail is required",
			v => /.+@.+\..+/.test(v) || "E-mail must be valid"
		],
		password: "",
		passwordRules: [v => !!v || "E-mail is required"],
		commonToastTimeout: 5000,
		isError: false,
		submitFormErrorMsg: ""
	}),

	methods: {
		validate() {
			this.$refs.form.validate();
			if (this.$refs.form.validate()) {
				this.submitLoginForm();
			}
		},
		submitLoginForm() {
			if (USER_EMAIL === this.email && USER_PASS === this.password) {
				this.isError = false;
				this.$router.push({ name: 'Home' })
			} else {
				this.isError = true;
				this.submitFormErrorMsg = "Email or password is wrong";
			}
		}
	}
};
</script>
<style lang="scss" scoped>
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
