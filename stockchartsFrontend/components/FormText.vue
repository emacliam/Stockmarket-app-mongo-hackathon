<template>
    <div class="flex flex-col">
      <label :for="uuid" v-html="labelHtml" />
      <InputText
        :type="type"
        :value="modelValue"
        :required="required"
        :id="uuid"
        :disabled="readOnly"
        @input="update($event.target.value)"
      />
      <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
    </div>
  </template>
  
  <script>



  export default {
    props: {
        modelValue: { required: true },
        required: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            required: false,
        },
        config: {
            type: Object,
            default: () => ({ type: "text" }),
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        uuid: {
            type: Number,
            default: 0,
        },
        validation: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            default: "text",
        },
        validations: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        labelHtml() {
            const requiredHtml = this.validations._exclusive && this.validations._exclusive.required
                ? " <span class=\"label--required\">*</span>"
                : "";
            return this.label + requiredHtml;
        },
    },
    methods: {
        update(value) {
            this.$emit("update:modelValue", value);
        },
    },
};
  </script>
  