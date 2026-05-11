<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container">
    <div class="d-flex justify-content-end pt-10">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        新增產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in adminProducts" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">
            {{ product.origin_price }}
          </td>
          <td class="text-right">
            {{ product.price }}
          </td>
          <td>
            <span class="text-success">啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, product)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(product)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <ThePagination :pagination="pagination" @change-page="getAdminProducts" />
    </div>
  </div>
  <ProductModal ref="productModal" :isNew="isNew" :product="tempProduct" @update-product="updateProduct">
  </ProductModal>
</template>
<script>
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import ThePagination from '@/components/ThePagination.vue';
import ProductModal from '@/components/dashboard/ProductModal.vue';
import { mapState, mapActions } from 'pinia';
import sweetAlert from '@/tools/alert';
export default {
  data() {
    return {
      tempProduct: {},
      isNew: false,
    }
  },
  computed: {
    ...mapState(productStore, ['adminProducts', 'pagination']),
    ...mapState(statusStore, ['isLoading']),
  },
  components: {
    ThePagination,
    ProductModal,
  },
  methods: {
    ...mapActions(productStore, ['getAdminProducts', 'updateAdminProduct', 'deleteAdminProduct']),
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew
      this.$refs.productModal.showModal();
    },
    async updateProduct(product) {
      await this.updateAdminProduct(product, this.isNew);
      this.$refs.productModal.hideModal();
    },
    async deleteProduct(product) {
      const res = await sweetAlert.alertDelete(product);
      if (res.isConfirmed) {
        // 刪除產品
        await this.deleteAdminProduct(product);
        this.$refs.productModal.hideModal();
      }
    }
  },
  created() {
    this.getAdminProducts();
  }
}
</script>
