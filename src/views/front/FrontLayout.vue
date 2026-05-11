<template>
  <TheHeader></TheHeader>
  <router-view></router-view>
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