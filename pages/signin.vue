<template>
  <Tabs default-value="login" class="w-[400px]">
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
</template>
