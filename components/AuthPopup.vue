<script setup lang="ts">
const { authQuery } = useAppAuth();
const open = computed(() => authQuery.value !== "");
</script>

<template>
  <Dialog :open="open">
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
