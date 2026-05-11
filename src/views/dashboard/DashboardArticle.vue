<template>
  <div class="container">
    <div class="d-flex justify-content-end pt-10">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        新增文章
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>文章標題</th>
          <th width="120">
            文章標籤
          </th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>
            <span v-for="tag in article.tag" :key="tag" class="text-dark badge badge-secondary mr-2">
              {{ tag }}
            </span>
          </td>
          <td>
            <span class="text-success">啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, article)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteAdminArticle(article.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ArticleModal ref="articleModal" :isNew="isNew" :article="tempArticle" @add-article="addArticle"
    @update-article="updateArticle"></ArticleModal>
</template>
<script>
import ArticleModal from '@/components/dashboard/ArticleModal.vue';
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      tempArticle: {},
      isNew: false,
    }
  },
  components: {
    ArticleModal
  },
  computed: {
    ...mapState(articleStore, ['articles'])
  },
  methods: {
    ...mapActions(articleStore, ['addAdminArticle', 'getAdminArticles', 'updateAdminArticle', 'deleteAdminArticle']),
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {};
      } else {
        this.tempArticle = { ...item };
      }
      this.isNew = isNew
      this.$refs.articleModal.showModal();
    },
    async addArticle(article) {
      const timestamp = new Date(article.date).getTime() / 1000;
      await this.addAdminArticle({ ...article, create_at: Number(timestamp) });
      this.$refs.articleModal.hideModal();
    },
    async updateArticle(article) {
      await this.updateAdminArticle(article);
      this.$refs.articleModal.hideModal();
    }
  },
  created() {
    this.getAdminArticles();
  }
}
</script>
