import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';
const status = statusStore();

export default defineStore('couponStore', {
  state: () => ({
    coupons: [],
    pagination: {}
  }),
  actions: {
    async addAdminCoupon(coupon) {
      status.isLoading = true;
      const couponData = {
        ...coupon,
        due_date: new Date(coupon.due_date).getTime() / 1000,
        percent: Number(coupon.percent)
      };
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`;
        const response = await axios.post(api, { data: couponData });
        if (response.data.success) {
          this.getCoupons();
        }
      } catch (error) {
        console.error('Error adding coupon:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async updateAdminCoupon(coupon) {
      status.isLoading = true;
      const couponData = {
        ...coupon,
        due_date: new Date(coupon.due_date).getTime() / 1000,
        percent: Number(coupon.percent)
      };
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${coupon.id}`;
        const response = await axios.put(api, { data: couponData });
        if (response.data.success) {
          this.getCoupons();
        }
      } catch (error) {
        console.error('Error updating coupon:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async deleteAdminCoupon(coupon) {
      status.isLoading = true;
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${coupon.id}`;
      try {
        const response = await axios.delete(api);
        if (response.data.success) {
          this.getCoupons();
        }
      } catch (error) {
        console.error('Error deleting coupon:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async getCoupons(page = 1) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=${page}`;
        const response = await axios.get(api);
        this.coupons = response.data.coupons;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async useCoupon(couponCode) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`;
        await axios.post(api, { data: { code: couponCode } });
      } catch (error) {
        console.error('Error applying coupon:', error);
      } finally {
        status.isLoading = false;
      }
    }
  }
})