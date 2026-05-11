<template>
  <div class="home-banner bg-cover" style="background-image: url('/image/home/home-banner.svg');">
    <div class="container d-flex flex-column justify-content-center h-100">
      <h1 class="text-light fs-2 fs-md-d mb-6">
        甜點・<br>
        幸福的起點
      </h1>
      <p class="text-light mb-24 mb-lg-18">
        讓每一份甜點，成為傳遞幸福的橋樑<br class="d-md-none"> ——— 幸福，也可以共享
      </p>
      <div class="d-md-flex">
        <router-link to="/products"
          class="home-banner-btn btn btn-primary-600 text-light py-4 px-10 mb-4 mb-md-0 me-md-6">
          開啟幸福之旅
          <img :src="arrowRightIcon" class="ms-4" alt="">
        </router-link>
        <router-link to="/articles" class="home-banner-btn btn btn-outline-primary-600 text-light py-4 px-10">
          一起改變世界
          <img :src="arrowRightIcon" class="ms-4" alt="">
        </router-link>
      </div>
    </div>
  </div>
  <div class="py-18 pt-lg-36 pb-lg-53 bg-cover" style="background-image: url('/image/home/product-bg.jpg');">
    <div class="container">
      <h2 class="text-primary-800 text-md-center fs-lg-1 mb-4">甜蜜推薦<span class="d-none d-md-inline">，</span><br
          class="d-md-none">讓心動更靠近！
      </h2>
      <p class="fs-7 fs-md-6 text-md-center mb-12 mb-lg-32">
        嚴選美味，專屬您的甜點時光！<br class="d-md-none">每一款都是我們的用心之作，帶來甜蜜的驚喜與幸福。
      </p>
      <ul class="list-unstyled row">
        <li v-for="product in randomProducts" :key="product.id" class="col-md-6 col-lg-3 mb-4">
          <router-link class="card-product" :to="`/product/${product.id}`">
            <div class="mb-4 card-product-img">
              <img class="w-100 h-100 object-fit-cover" :src="product.imageUrl" :alt="product.name">
              <button type="button" class="card-product-img-btn btn btn-primary-500 w-100 py-4 text-light">
                立即選購
              </button>
            </div>
            <div class="text-center font-serif">
              <h3 class="fs-5 mb-4 text-dark">{{ product.title }}</h3>
              <p class="fs-5 text-primary-800">NT$ {{ product.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="home-news py-18 py-lg-36" style="background-image: url('/image/home/news-bg.svg')">
    <div class="container">
      <h2 class="text-primary-800 fs-lg-1 mb-4">最新消息</h2>
      <p class="text-gray-700 mb-12 mb-lg-32">探索最新公益成果，與我們一起改變世界。</p>
      <div class="row mb-12">
        <div class="col-md-6 mb-12">
          <router-link to="/article/1" class="home-news-card">
            <div class="mb-2 mb-md-3 home-news-img-1">
              <img class="w-100 h-100 object-fit-cover" :src="new1Image" alt="new1Image">
            </div>
            <p class="fs-7 text-gray-700 mb-2">2024 年 9 月 28 日</p>
            <h3 class="fs-5 fs-lg-3 mb-2 mb-md-3 title">小甜點，大愛心，為毛孩帶來滿滿能量！</h3>
            <p class="fs-7 text-gray-700 fs-md-6">
              和幸享屋一起，讓流浪毛孩不再挨餓！
            </p>
          </router-link>
        </div>
        <div class="col-md-6">
          <router-link to="/article/2" class="home-news-card">
            <div class="d-md-flex gap-md-4 mb-12">
              <div class="home-news-img-2 mb-2 mb-md-0">
                <img class="h-100 w-100 object-fit-cover" :src="new2Image" alt="new2Image">
              </div>
              <div>
                <p class="fs-7 text-gray-700 mb-2">2024 年 9 月 28 日</p>
                <h3 class="fs-5 mb-2 title">甜點與地球同行，種下100棵新希望！</h3>
                <p class="fs-7 text-gray-700">
                  甜點與綠意同行，我們和地球都感謝您！
                </p>
              </div>
            </div>
          </router-link>
          <router-link to="/article/3" class="home-news-card">
            <div class="d-md-flex gap-md-4">
              <div class="home-news-img-2 mb-2 mb-md-0">
                <img class="h-100 w-100 object-fit-cover" :src="new3Image" alt="new3Image">
              </div>
              <div>
                <p class="fs-7 text-gray-700 mb-2">2024 年 9 月 28 日</p>
                <h3 class="fs-5 mb-2 title">一起分享幸福，送出500份溫暖餐點！</h3>
                <p class="fs-7 text-gray-700">
                  您的甜點，正在改變世界。
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="d-flex justify-content-center justify-content-md-end">
        <router-link to="/news" class="text-primary-600 py-5">
          全部消息
          <span class="ms-4">
            <img :src="arrowRightIconBrown" alt="arrowRightIcon">
          </span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="home-thanks pt-18 pb-64 pt-lg-36 bg-cover" style="background-image: url('/image/home/thanks-bg.jpg')">
    <div class="container text-light">
      <h2 class="fs-lg-1 mb-6 mb-lg-4">感謝有您</h2>
      <p class="fs-7 fs-md-6">您的每一次捐款，都是一個幸福的故事。</p>
      <p class="fs-7 fs-md-6 mb-12 mb-lg-20">在這裡，我們記錄每一份善意，分享每一個改變的瞬間。</p>
      <ul class="list-unstyled row font-serif gy-6">
        <li class="col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="home-thanks-circle down d-flex flex-column justify-content-center align-items-center"
            style="background-image: url('/image/home/thanks-flower.svg')">
            <p class="fs-5 text-dark mb-6">
              <span class="fs-1 text-primary-800">300</span>
              多隻
            </p>
            <p class="text-dark fs-5">流浪動物得到溫暖</p>
          </div>
        </li>
        <li class="col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="home-thanks-circle d-flex flex-column justify-content-center align-items-center"
            style="background-image: url('/image/home/thanks-flower.svg')">
            <p class="fs-5 text-dark mb-6">
              已募集愛心
            </p>
            <p class="fs-5 text-dark mb-6">
              <span class="fs-1 text-primary-800">800000</span>
              元
            </p>
          </div>
        </li>
        <li class="col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="home-thanks-circle down d-flex flex-column justify-content-center align-items-center"
            style="background-image: url('/image/home/thanks-flower.svg')">
            <p class="fs-5 text-dark mb-6">
              <span class="fs-1 text-primary-800">500</span>
              多位
            </p>
            <p class="text-dark fs-5">弱勢兒童得到營養</p>
          </div>
        </li>
        <li class="col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="home-thanks-circle d-flex flex-column justify-content-center align-items-center"
            style="background-image: url('/image/home/thanks-flower.svg')">
            <p class="fs-5 text-dark mb-6">
              <span class="fs-1 text-primary-800">200</span>
              顆
            </p>
            <p class="text-dark fs-5">新種植的樹木</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- <footer class="position-relative pt-48 pb-4 bg-primary-700">
    <div class="footer-decoration text-center d-flex flex-column justify-content-center align-items-center text-light"
      style="background-image: url('/image/footer/flower.svg')">
      <p class="pb-3">想要加入愛心行列嗎？</p>
      <p class="pb-3">現在就購買甜點</p>
      <p>一起分享幸福</p>
    </div>
    <div class="container">
      <div
        class="d-flex flex-column align-items-center flex-md-row justify-content-md-between align-items-md-center border-bottom border-primary-500 pb-md-8">
        <router-link to="/" class="mb-6 mb-md-0">
          <img :src="headerLogo" alt="Logo">
        </router-link>
        <ul class="d-md-none list-unstyled d-flex align-items-center gap-4">
          <li>
            <a href="/">
              <img :src="facebookIcon" alt="Facebook">
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="instagramIcon" alt="Instagram">
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="twitterIcon" alt="Twitter">
            </a>
          </li>
        </ul>
        <ul class="d-none d-md-flex text-gray-100 list-unstyled mb-0 gap-10 font-serif">
          <li>
            <router-link to="/">最新消息</router-link>
          </li>
          <li>
            <router-link to="/">公益方案</router-link>
          </li>
          <li>
            <router-link to="/">會員專區</router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column justify-content-md-between flex-md-row align-items-md-center py-md-8">
        <ul
          class="d-flex align-items-center justify-content-center d-md-none py-4 text-gray-100 list-unstyled mb-0 gap-10 font-serif border-bottom border-primary-500">
          <li>
            <router-link to="/">最新消息</router-link>
          </li>
          <li>
            <router-link to="/">公益方案</router-link>
          </li>
          <li>
            <router-link to="/">會員專區</router-link>
          </li>
        </ul>
        <ul class="d-none d-md-flex align-items-md-center list-unstyled gap-4 mb-0">
          <li>
            <a href="/">
              <img :src="facebookIcon" alt="Facebook">
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="instagramIcon" alt="Instagram">
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="twitterIcon" alt="Twitter">
            </a>
          </li>
        </ul>
        <p class="text-gray-100 text-center py-4 fs-7">
          © 2024 幸享屋 All rights reserved.
        </p>
      </div>
    </div>
  </footer> -->
</template>
<script>
import arrowRightIcon from '/image/home/arrow_right.svg';
import arrowRightIconBrown from '/image/home/arrow_right-brown.svg';
import productStore from '@/stores/productStore';
import new1Image from '/image/home/news-1.svg';
import new2Image from '/image/home/news-2.svg';
import new3Image from '/image/home/news-3.svg';
import headerLogo from '/image/main-logo.svg';
import facebookIcon from '/image/footer/facebook.svg';
import instagramIcon from '/image/footer/instagram (1).svg';
import twitterIcon from '/image/footer/twitter.svg';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      arrowRightIcon,
      arrowRightIconBrown,
      new1Image,
      new2Image,
      new3Image,
      headerLogo,
      facebookIcon,
      instagramIcon,
      twitterIcon,
    }
  },
  computed: {
    ...mapState(productStore, ['products']),
    randomProducts() {
      return [...this.products].sort(() => 0.5 - Math.random()).slice(0, 4);
    },
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
  },
  created() {
    this.getProducts();
  },
}
</script>
