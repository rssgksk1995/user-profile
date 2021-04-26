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
                v-model="firstName"
                :defaultValue="firstName"
              />
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <TextField
                fieldLabel="Last Name"
                v-model="lastName"
                :defaultValue="lastName"
              />
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <EmailField
                fieldLabel="Email"
                v-model="email"
                :defaultValue="email"
              />
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <MobileField
                fieldLabel="Phone"
                v-model="mobile"
                :defaultValue="mobile"
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

export default {
  name: "UserPage",
  components: {
    HeadingComponent,
    TextField,
    EmailField,
    MobileField,
  },
  data: () => ({
    valid: true,
    commonToastTimeout: 5000,
    allowMultiple: true,
    firstName: "",
    lastName: "",
    selectedGender: "",
    selectedQualification: "",
    mobile: "",
    email: "",
    testField: "",
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.addUserDetails();
      }
    },
    addUserDetails() {
      let payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        gender: this.selectedGender,
        mobile: this.mobile,
        email: this.email,
      };
      console.log("payload", payload);
      this.$store
        .dispatch("user/addUserData", payload)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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
