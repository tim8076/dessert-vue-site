<template>
  <LoadingComponent :active="isLoading" color="#926D62" :width="60" :height="60"></LoadingComponent>
  <div class="product-single">
    <div
      class="position-relative container d-flex justify-content-between align-items-center py-2 py-lg-10 border-bottom border-gray-300">
      <ul class="nav-list">
        <li>
          <router-link class="nav-list-link" to="/">首頁</router-link>
        </li>
        <li>
          <router-link class="nav-list-link" to="/products">全部商品</router-link>
        </li>
        <li>
          <p class="nav-list-link active">人氣蛋糕</p>
        </li>
      </ul>
    </div>
    <div class="container pb-12 pt-lg-18 pb-lg-33">
      <div class="row">
        <div class="col-md-6 mb-6">
          <img :src="product.imageUrl" alt="Product Image" class="w-100 product-single-img object-fit-cover">
        </div>
        <div class="col-md-6">
          <div class="ps-lg-6">
            <h1 class="fs-2 fs-lg-1 text-primary-800 mb-7 mb-lg-8">{{ product.title }}</h1>
            <p class="mb-6 mb-lg-8">{{ product.content }}</p>
            <p class="mb-6 mb-lg-8">{{ product.description }}</p>
            <p class="fs-5 fs-lg-4 text-danger font-serif mb-8 mb-lg-12">
              NT$ <span class="fs-2 fs-lg-1">{{ product.price }}</span>
            </p>
            <p class="text-gray-600 mb-3">數量</p>
            <div class="input-group mb-12">
              <button class="btn btn-gray-100 border-gray-400 p-4 fs-4" type="button" id="button-addon1"
                @click.prevent="cart.quantity > 1 ? cart.quantity-- : null">-</button>
              <input type="number" class="form-control py-3 text-center border-gray-400" placeholder=""
                v-model="cart.quantity" min="1">
              <button class="btn btn-gray-100 border-gray-400 p-4 fs-4" type="button" id="button-addon1"
                @click.prevent="cart.quantity++">+</button>
            </div>
            <button type="button"
              class="btn btn-danger py-4 w-100 d-flex align-items-center justify-content-center gap-2"
              @click="addToCart({ product_id: product.id, qty: cart.quantity })">
              <ShoppingCartIcon class="shop-cart-icon"></ShoppingCartIcon> 加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-8 pb-12 pt-lg-18 pb-lg-33 bg-primary-100">
      <div class="container">
        <h2 class="text-primary-800 fs-4 mb-8 mb-lg-12">類似商品</h2>
        <Swiper :slides-per-view="1.2" :space-between="24" :loop="true" :autoplay="{ delay: 2500 }" :modules="modules"
          :breakpoints="{
            768: { slidesPerView: 2.5 },
            992: { slidesPerView: 4 }
          }">
          <SwiperSlide v-for="product in randomProducts" :key="product.id">
            <router-link class="card-product" :to="`/product/${product.id}`">
              <div class="mb-4 card-product-img">
                <img class="w-100 h-100 object-fit-cover" :src="product.imageUrl" :alt="product.name">
                <button type="button" class="card-product-img-btn btn btn-primary-500 w-100 py-4 text-light">
                  立即選購
                </button>
              </div>
              <div class="text-center font-serif">
                <h3 class="fs-5 mb-4 text-dark">{{ product.title }}</h3>
              </div>
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>
<script>
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';
import { ShoppingCartIcon } from '@heroicons/vue/16/solid';
import { mapState, mapActions } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
export default {
  name: 'ProductSingle',
  data() {
    return {
      modules: [Autoplay],
      cart: {
        quantity: 1,
      }
    }
  },
  computed: {
    ...mapState(productStore, ['product', 'products']),
    ...mapState(statusStore, ['isLoading']),
    randomProducts() {
      return [...this.products].sort(() => 0.5 - Math.random()).slice(0, 6);
    },
  },
  components: {
    ShoppingCartIcon,
    Swiper,
    SwiperSlide
  },
  methods: {
    ...mapActions(productStore, ['getProductById', 'getProducts']),
    ...mapActions(cartStore, ['addToCart']),
  },
  created() {
    const productId = this.$route.params.id;
    this.getProductById(productId);
    this.getProducts();
  },
  beforeRouteUpdate(to) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    this.getProductById(to.params.id);
    this.cart.quantity = 1;
    this.getProducts();
  },
}
</script>
