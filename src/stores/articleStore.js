import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';
import { Pagination } from 'swiper/modules';
const status = statusStore();

export default defineStore('articleStore', {
  state: () => ({
    articles: [],
    pagination: {},
  }),
  actions: {
    async getAdminArticles() {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/articles`;
        const response = await axios.get(api);
        this.articles = response.data.articles;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async addAdminArticle(article) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article`;
        await axios.post(api, { data: article });
        await this.getAdminArticles();
      } catch (error) {
        console.error('Error adding article:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async updateAdminArticle(article) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article/${article.id}`;
        await axios.put(api, { data: article });
        await this.getAdminArticles();
      } catch (error) {
        console.error('Error updating article:', error);
      } finally {
        status.isLoading = false;
      }
    },
    async deleteAdminArticle(articleId) {
      status.isLoading = true;
      try {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article/${articleId}`;
        await axios.delete(api);
        await this.getAdminArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      } finally {
        status.isLoading = false;
      }
    }
  },
})