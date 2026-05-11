<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container">
    <VForm class="w-100 row justify-content-center" v-slot="{ errors }" @submit="signIn">
      <div class="col-md-6 vh-100 d-flex flex-column justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <VField type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus
            name="inputEmail" v-model="user.username" rules="email|required"
            :class="{ 'is-invalid': errors['inputEmail'] }" />
          <ErrorMessage name="inputEmail" class="text-danger" />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <VField type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password"
            name="inputPassword" rules="required|min:6" />
          <ErrorMessage name="inputPassword" class="text-danger" />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
    }
  },
  methods: {
    async signIn() {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_APP_API}admin/signin`;
      try {
        const res = await this.$http.post(api, this.user);
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `ecomToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error signing in:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
