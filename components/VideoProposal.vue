<script setup>
import CardFooter from "./ui/card/CardFooter.vue";
import CardTitle from "./ui/card/CardTitle.vue";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

function onSubmit(e) {
  e.preventDefault();
  emit("update:modelValue", true);
}
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Make Us Dance!</CardTitle>
      <CardDescription
        >Know a video that’s too good to skip? Share it with the crew!
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="url">
          <FormItem>
            <FormLabel>Youtube URL</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>
    <CardFooter class="gap-4 justify-end">
      <Button variant="outline" @click="emit('update:modelValue', true)">
        Skip
      </Button>
      <Button type="submit">Submit</Button>
    </CardFooter>
  </Card>
</template>
