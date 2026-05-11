import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';
const status = statusStore();

export default defineStore('productStore', {
  state: () => ({
    adminProducts: [],
    products: [],
    product: {},
    pagination: {}
  }),
  actions: {
    async getProducts() {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
        const response = await axios.get(api);
        this.products = response.data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async getProductById(id) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
        const response = await axios.get(api);
        this.product = response.data.product;
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      } finally {
        status.isLoading = false;
      }
    },
    async getProductsByPage(page = 1) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/?page=${page}`;
        const response = await axios.get(api);
        this.productByPage = response.data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async getAdminProducts(page = 1) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`;
        const response = await axios.get(api);
        this.adminProducts = response.data.products;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async updateAdminProduct(product, isNew) {
      let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
      let method = 'post';
      if (!isNew) {
        api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${product.id}`;
        method = 'put';
      }
      try {
        const response = await axios[method](api, { data: product });
        if (response.data.success) {
          this.getAdminProducts();
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async deleteAdminProduct(product) {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${product.id}`;
      try {
        const response = await axios.delete(api);
        if (response.data.success) {
          this.getAdminProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
})