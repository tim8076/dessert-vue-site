import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';
const status = statusStore();

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
  }),
  actions: {
    async addToCart({ product_id, qty }) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
        await axios.post(api, { data: { product_id, qty } });
        this.getCart(); // Refresh the cart after adding an item
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async getCart() {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
        const response = await axios.get(api);
        this.cart = response.data.data;
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async removeCartItem(item_id) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item_id}`;
        await axios.delete(api);
        this.getCart(); // Refresh the cart after removing an item
      } catch (error) {
        console.error('Error removing cart item:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async removeAllCart() {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/carts`;
        await axios.delete(api);
        this.getCart(); // Refresh the cart after clearing it
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async updateCartItem({ cart_id, product_id, qty }) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${cart_id}`;
        await axios.put(api, { data: { product_id, qty } });
        this.getCart();
      } catch (error) {
        console.error('Error updating cart item:', error);
      } finally {
        status.isLoading = false;
      }
    }
  }
})