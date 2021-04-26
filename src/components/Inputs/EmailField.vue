<template>
  <v-text-field
    :label="fieldLabel"
    v-model="localValue"
    :value="defaultValue"
    v-on:input="$emit('input', $event)"
    :rules="emailRules"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    defaultValue: {
      default: "",
    },
    fieldLabel: {
      default: "Email",
    },
  },
  data() {
    return {
      // to avoid direct mutation
      localValue: this.defaultValue,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
