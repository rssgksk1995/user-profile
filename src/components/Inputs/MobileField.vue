<template>
  <v-text-field
    :label="fieldLabel"
    v-model="localValue"
    :value="defaultValue"
    v-on:input="$emit('input', $event)"
    :rules="numberRule"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    defaultValue: {
      default: "",
    },
    fieldLabel: {
      default: "Mobile",
    },
  },
  data() {
    return {
      // to avoid direct mutation
      localValue: this.defaultValue,
      numberRule: [(v) => !!v || "Required"],
    };
  },
};
</script>
<style lang="scss" scoped></style>
