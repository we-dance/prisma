<script setup lang="ts">
import { ref } from "vue";

const data = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});

const addEvent = () => {
  console.log(data.value);
};
</script>

<template>
  <h3 class="text-3xl">Add Event</h3>

  <FormKit
    type="form"
    @submit="addEvent"
    :submit-attrs="{
      inputClass:
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    }"
  >
    <FormKit
      name="name"
      id="name"
      label="Event Name"
      validation="required|length:5"
      min="5"
      v-model="data.name"
      :classes="{
        input: {
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
        },
        inner: {
          'py-2': true,
        },
      }"
    />
    <FormKit
      name="description"
      type="textarea"
      id="description"
      label="Description"
      validation="required"
      v-model="data.description"
      :classes="{
        input: {
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
        },
        inner: {
          'py-2': true,
        },
      }"
    />
    <FormKit
      name="startDate"
      type="date"
      id="startDate"
      label="Start Date"
      validation="required"
      v-model="data.startDate"
      :classes="{
        input: {
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
        },
        inner: {
          'py-2': true,
        },
      }"
    />
    <FormKit
      name="endDate"
      type="date"
      id="endDate"
      label="End Date"
      validation="required"
      v-model="data.endDate"
      :classes="{
        input: {
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
        },
        inner: {
          'py-2': true,
        },
      }"
    />
  </FormKit>
</template>

<style>
.formkit-message {
  color: #dc2626;
}
</style>
