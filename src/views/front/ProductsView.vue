<template>
  <div class="product-list min-h-screen">
    <div
      class="position-relative container d-flex justify-content-between align-items-center py-2 py-lg-10 border-bottom border-gray-300">
      <ul class="nav-list py-4">
        <li>
          <router-link class="nav-list-link" to="/">首頁</router-link>
        </li>
        <li>
          <a class="nav-list-link" @click.prevent="setCurrentCategory('')">全部商品</a>
        </li>
        <li v-show="currentCategory !== ''">
          <p class="nav-list-link active">{{ currentCategory }}</p>
        </li>
      </ul>
      <div class="position-relative d-none d-md-block search-input">
        <input type="text" class="form-control py-3 px-13" id="desktopSearchInput" placeholder="輸入搜尋關鍵字"
          v-model.trim="searchText">
        <img :src="searchIcon" alt="Search" class="position-absolute ms-4 top-50 start-0 translate-middle-y">
      </div>
      <div class="d-md-none">
        <a href="#" v-if="!isSearchOpen" @click.prevent="toggleSearch">
          <img :src="searchIcon" alt="Search">
        </a>
        <div class="p-4 position-absolute top-0 start-0 w-100 bg-white" v-if="isSearchOpen">
          <div class="position-relative">
            <input type="text" class="form-control py-3 px-13 bg-light" id="mobileSearchInput" placeholder="輸入搜尋關鍵字"
              v-model.trim="searchText">
            <img :src="searchIcon" alt="Search" class="position-absolute ms-4 top-50 start-0 translate-middle-y">
            <a href="#">
              <img :src="CircleButton" alt="Close" class="position-absolute me-4 top-50 end-0 translate-middle-y"
                @click.prevent="toggleSearch">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-6 pb-18 py-lg-18 pb-lg-33">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <ul class="list-unstyled d-flex align-items-center gap-3 overflow-x-scroll d-lg-none">
              <li class="flex-shrink-0">
                <button type="button" class="btn py-2 px-4 border-gray-400"
                  :class="currentCategory === '' ? 'btn-primary-700' : 'btn-light'" @click="setCurrentCategory('')">
                  全部商品
                </button>
              </li>
              <li class="flex-shrink-0" v-for="category in categoryList" :key="category">
                <button type="button" class="btn py-2 px-4 border-gray-400"
                  :class="currentCategory === category[0] ? 'btn-primary-700' : 'btn-light'"
                  @click="setCurrentCategory(category[0])">
                  {{ category[0] }} ({{ category[1] }})
                </button>
              </li>
            </ul>
            <ul class="list-unstyled d-none d-lg-block">
              <li class="mb-4">
                <a href="#" @click.prevent="setCurrentCategory('')"
                  :class="currentCategory === '' ? 'text-danger' : 'text-dark'">
                  全部商品
                </a>
              </li>
              <li class="mb-4" v-for="category in categoryList" :key="category">
                <a href="#" @click.prevent="setCurrentCategory(category[0])"
                  :class="currentCategory === category[0] ? 'text-danger' : 'text-dark'">
                  {{ category[0] }} ({{ category[1] }})
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9">
            <ul class="row list-unstyled mb-18">
              <li class="col-md-6 col-lg-4" v-for="product in renderProducts" :key="product.id">
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
            <FrontPagination :totalPages="totalPages" @page-change="setCurrentPage" :currentPage="currentPage">
            </FrontPagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import searchIcon from '@/assets/image/icon/magnifying-glass.svg';
import CircleButton from '@/assets/image/icon/CircleButton.svg';
import productImage from '@/assets/image/product/product.jpg';
import productStore from '@/stores/productStore';
import { mapState, mapActions } from 'pinia';
import FrontPagination from '@/components/front/FrontPagination.vue';
export default {
  data() {
    return {
      searchIcon,
      CircleButton,
      isSearchOpen: false,
      currentCategory: '',
      currentPage: 1,
      searchText: '',
      productImage
    }
  },
  components: {
    FrontPagination,
  },
  computed: {
    ...mapState(productStore, ['products']),
    categoryList() {
      // const categories = new Set(this.products.map(product => product.category));
      // return Array.from(categories);
      const categories = {};
      this.products.forEach(product => {
        if (!categories[product.category]) {
          categories[product.category] = 1;
        } else {
          categories[product.category] += 1;
        }
      });
      return Object.entries(categories);
    },
    productCategory() {
      if (this.currentCategory === '') {
        return this.products;
      }
      return this.products.filter(product => product.category === this.currentCategory);
    },
    productsByPage() {
      const start = (this.currentPage - 1) * 6;
      const end = start + 6;
      return this.productCategory.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.productCategory.length / 6);
    },
    searchProducts() {
      if (this.searchText.trim() === '') {
        return this.products;
      }
      const searchLower = this.searchText.toLowerCase();
      return this.products.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    },
    renderProducts() {
      if (this.searchText.trim() !== '') {
        return this.searchProducts;
      }
      return this.productsByPage;
    }
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },
    setCurrentCategory(category) {
      this.searchText = '';
      this.currentPage = 1;
      this.currentCategory = category;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    }
  },
  created() {
    this.getProducts();
  },
}
</script>