<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleSubmit" class="w-full md:w-1/2">
      <div
        v-for="field in filteredFields"
        :key="field.id"
        class="w-full mb-4 grid grid-cols-2 justify-center items-center gap-3"
      >
        <label :for="field.id">{{ field.label }}</label>
        <div class="w-full flex justify-end">
          <input
            v-if="field.type !== 'dropdown' && formValues[field.id]"
            class="block border-2 px-2 border-solid border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :class="{ 'w-full': field.type !== 'checkbox' }"
            v-model="formValues[field.id].value"
            :id="field.id"
            :name="field.id"
            :type="field.type"
          />
          <select
            v-if="field.type === 'dropdown' && formValues[field.id]"
            v-model="formValues[field.id].value"
            class="block border-2 w-full border-solid px-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :id="field.id"
            :name="field.id"
          >
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
            >
          </select>
        </div>

        <!-- Validation error message -->
        <span></span>
        <div>
          <span
            v-if="
              submitFormErrors &&
              field.validationRules?.required &&
              (!formValues[field.id] || formValues[field.id].value === '')
            "
            class="text-red-400 text-sm flex justify-end"
          >
            This field is required.
          </span>
          <span
            v-if="
              submitFormErrors &&
              field.validationRules?.min &&
              Number(formValues[field.id]?.value) < field.validationRules?.min
            "
            class="text-red-400 text-sm flex justify-end"
          >
            The value must be at least {{ field.validationRules.min }}.
          </span>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="text-center hover:bg-green-600 bg-green-800 text-white rounded-md shadow-md px-3 py-1 border-slate-400 border-2"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import formSchema from '../services/formSchema.json'
import { TextField, NumberField, CheckboxField, DropdownField } from '@/services/FormField'
import { computed, onMounted, ref } from 'vue'

const submitFormErrors = ref(false)
const schema = formSchema

type FormField = TextField | NumberField | CheckboxField | DropdownField

const formValues = ref<{ [key: string]: FormField }>({})
const initialFormValues = ref<{ [key: string]: FormField }>({})

onMounted(() => {
  schema.fields.forEach((field) => {
    const validationRules = field.validationRules as {
      [key: string]: string | boolean | number | undefined
    }

    if (field.type === 'text') {
      formValues.value[field.id] = new TextField(field.id, field.label, validationRules)
    } else if (field.type === 'number') {
      formValues.value[field.id] = new NumberField(field.id, field.label, validationRules)
    } else if (field.type === 'checkbox') {
      formValues.value[field.id] = new CheckboxField(field.id, field.label, validationRules)
    } else if (field.type === 'dropdown') {
      formValues.value[field.id] = new DropdownField(
        field.id,
        field.label,
        field.options,
        validationRules,
      )
    }
    initialFormValues.value[field.id] = { ...formValues.value[field.id] }
  })
})

const filteredFields = computed(() => {
  return schema.fields.filter((field) => {
    if (field.conditional) {
      const conditionalField = formValues.value[field.conditional.field]

      return conditionalField ? conditionalField?.value == field.conditional.value : true
    }
    return true
  })
})

const resetForm = () => {
  formValues.value = JSON.parse(JSON.stringify(initialFormValues.value))
  submitFormErrors.value = false
}

const handleSubmit = () => {
  const errors = schema.fields.filter((field) => {
    const fieldValue = formValues.value[field.id]?.value
    const isFieldRequired = field.validationRules?.required
    const minValue = field.validationRules?.min
    let hasError = false

    if (field.conditional) {
      const conditionalField = formValues.value[field.conditional.field]

      if (conditionalField.value != field.conditional.value) {
        return
      }
    }

    if (isFieldRequired && (fieldValue === undefined || fieldValue === '')) {
      hasError = true
    }

    if (field.type === 'number' && minValue !== undefined) {
      if (minValue > Number(fieldValue)) {
        hasError = true
      }
    }

    return hasError
  })

  if (errors.length) {
    alert('Please fill in all required fields.')
    submitFormErrors.value = true
    return
  } else {
    console.log('Form submitted:', formValues.value)

    resetForm()
  }
}
</script>
