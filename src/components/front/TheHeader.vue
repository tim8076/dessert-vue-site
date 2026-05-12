<template>
  <div class="z-3 header-bg py-4 py-md-6 position-fixed top-0 start-0 end-0">
    <div class="container d-flex align-items-center justify-content-between">
      <router-link to="/">
        <img :src="headerLogo" class="header-logo" alt="Logo">
      </router-link>
      <div class="header-links">
        <div class="d-flex d-md-none">
          <router-link class="header-link" to="/products">
            <CakeIcon class="header-icon"></CakeIcon>
          </router-link>
          <router-link class="header-link position-relative" to="/cart">
            <ShoppingCartIcon class="header-icon"></ShoppingCartIcon>
            <span
              class="header-cart-number position-absolute top-0 start-100 translate-middle p-2 bg-danger  rounded-circle text-light">
              <span class="fs-7">{{ cart?.carts?.length }}</span>
            </span>
          </router-link>
        </div>
        <div class="d-none d-md-flex align-items-center gap-10">
          <router-link to="/products">
            甜點專區
          </router-link>
          <router-link to="/articles">
            最新消息
          </router-link>
          <router-link class="header-link position-relative" to="/cart">
            <ShoppingCartIcon class="header-icon"></ShoppingCartIcon>
            <span
              class="header-cart-number position-absolute top-0 start-100 translate-middle p-2 bg-danger  rounded-circle text-light">
              <span class="fs-7">{{ cart?.carts?.length }}</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cartStore from '@/stores/cartStore';
import { CakeIcon, ShoppingCartIcon } from '@heroicons/vue/16/solid';
import headerLogo from '@/assets/image/main-logo.svg';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      headerLogo
    }
  },
  computed: {
    ...mapState(cartStore, ['cart']),
  },
  components: {
    CakeIcon,
    ShoppingCartIcon
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
  },
  created() {
    this.getCart();
  }
}
</script>