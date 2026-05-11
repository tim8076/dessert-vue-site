<template>
  <TheHeader></TheHeader>
  <div class="not-found-page min-h-screen d-flex flex-column justify-content-center align-items-center">
    <p class="fs-1 mb-4">404</p>
    <p class="fs-4 mb-4">抱歉，您訪問的頁面不存在或已被移除。</p>
    <router-link to="/" class="btn btn-primary">返回首頁</router-link>
  </div>
  <TheFooter></TheFooter>
</template>
<script>
import TheHeader from '@/components/front/TheHeader.vue';
import TheFooter from '@/components/front/TheFooter.vue';
export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>