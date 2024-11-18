<script setup lang="ts">
const { authQuery, authQueryLoading } = useAppAuth();
const open = computed(() => authQuery.value !== "");
const onChange = (open: boolean) => {
  authQueryLoading.value = open;
};
</script>

<template>
  <Dialog :open="open" @update:open="onChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign in to {{ authQuery }}</DialogTitle>
      </DialogHeader>
      <Tabs default-value="login">
        <Card>
          <CardTitle>
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="login"> Login </TabsTrigger>
              <TabsTrigger value="register"> Register </TabsTrigger>
            </TabsList>
          </CardTitle>
          <CardContent>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
