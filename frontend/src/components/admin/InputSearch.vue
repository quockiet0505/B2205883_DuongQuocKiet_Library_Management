
<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="form-control"
    placeholder="Search..."
  />
</template>

<script>
export default {
  name: "InputSearch",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>
