<script setup>
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";

const { $client } = useNuxtApp();
const { data } = useAuth();
const { skipProposal } = useProposal();

const props = defineProps({
  styleId: {
    type: Number,
    required: true,
  },
});

const form = useForm({});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await $client.videos.add.mutate({
      url: values.url,
      createdById: data.value?.profileId,
      styleId: props.styleId,
    });
    skipProposal.value = true;
  } catch (error) {
    toast.error("This video has already been added.");
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Make Us Dance!</CardTitle>
        <CardDescription
          >Know a video that’s too good to skip? Share it with the crew!
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter class="gap-4 justify-end">
        <Button type="button" variant="outline" @click="skipProposal = true">
          Skip
        </Button>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  </form>
</template>
