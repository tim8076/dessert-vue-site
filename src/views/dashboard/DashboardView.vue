<template>
  <DashboardNavbar></DashboardNavbar>
  <router-view></router-view>
</template>

<script>
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';
export default {
  components: {
    DashboardNavbar
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ecomToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common['Authorization'] = token;
    const api = `${import.meta.env.VITE_APP_API}api/user/check`;
    this.$http.post(api)
      .then(res => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      })
  }
}
</script>