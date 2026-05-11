<template>
  <footer class="position-relative pt-12 pt-lg-8 pb-4 pb-lg-8 bg-primary-700">
    <div class="container">
      <div
        class="d-flex flex-column align-items-center flex-md-row justify-content-md-between align-items-md-center border-bottom border-primary-500 pb-md-8">
        <router-link to="/" class="mb-6 mb-md-0">
          <img :src="headerLogo" alt="Logo">
        </router-link>
        <ul class="d-md-none list-unstyled d-flex align-items-center gap-4">
          <li>
            <a href="https://www.facebook.com/" target="_blank">
              <img :src="facebookIcon" alt="Facebook">
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank">
              <img :src="instagramIcon" alt="Instagram">
            </a>
          </li>
          <li>
            <a href="https://x.com/home" target="_blank">
              <img :src="twitterIcon" alt="Twitter">
            </a>
          </li>
        </ul>
        <ul class="d-none d-md-flex text-gray-100 list-unstyled mb-0 gap-10 font-serif">
          <li>
            <router-link to="/articles">最新消息</router-link>
          </li>
          <li>
            <router-link to="/products">甜點專區</router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column justify-content-md-between flex-md-row align-items-md-center py-md-8">
        <ul
          class="d-flex align-items-center justify-content-center d-md-none py-4 text-gray-100 list-unstyled mb-0 gap-10 font-serif border-bottom border-primary-500">
          <li>
            <router-link to="/articles">最新消息</router-link>
          </li>
          <li>
            <router-link to="/products">甜點專區</router-link>
          </li>
        </ul>
        <ul class="d-none d-md-flex align-items-md-center list-unstyled gap-4 mb-0">
          <li>
            <a href="https://www.facebook.com/" target="_blank">
              <img :src="facebookIcon" alt="Facebook">
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank">
              <img :src="instagramIcon" alt="Instagram">
            </a>
          </li>
          <li>
            <a href="https://x.com/home" target="_blank">
              <img :src="twitterIcon" alt="Twitter">
            </a>
          </li>
        </ul>
        <p class="text-gray-100 text-center py-4 fs-7">
          © 2024 幸享屋 All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
import facebookIcon from '/image/footer/facebook.svg';
import instagramIcon from '/image/footer/instagram (1).svg';
import twitterIcon from '/image/footer/twitter.svg';
import headerLogo from '/image/main-logo.svg';

export default {
  data() {
    return {
      facebookIcon,
      instagramIcon,
      twitterIcon,
      headerLogo
    }
  }
}
</script>