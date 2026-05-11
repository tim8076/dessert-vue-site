import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';
const status = statusStore();

export default defineStore('orderStore', {
  state: () => ({
    orders: [],
    pagination: {}
  }),
  actions: {
    async sendOrder({ user, message }) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`;
        const response = await axios.post(api, { data: { user, message } });
        return response;
        // Handle successful order submission (e.g., show a success message)
      } catch (error) {
        console.error('Error sending order:', error);
        // Handle error (e.g., show an error message)
      } finally {
        status.isLoading = false;
      }
    },
    async getOrder(orderId) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${orderId}`;
        const response = await axios.get(api);
        // Handle successful order retrieval (e.g., display order details)
      } catch (error) {
        console.error('Error fetching order:', error);
        // Handle error (e.g., show an error message)
      } finally {
        status.isLoading = false;
      }
    },
    async getOrders(page = 1) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=${page}`;
        const response = await axios.get(api);
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async updateAdminOrder(order) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${order.id}`;
        await axios.put(api, { data: order });
        this.getOrders(); // Refresh the orders list after updating
        // Handle successful update (e.g., update the orders list)
      } catch (error) {
        console.error('Error updating order:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async deleteAdminOrder(order) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${order.id}`;
        await axios.delete(api);
        this.getOrders(); // Refresh the orders list after deletion
        // Handle successful deletion (e.g., update the orders list)
      } catch (error) {
        console.error('Error deleting order:', error);
      } finally {
        status.isLoading = false;
      }
    }
  }
})