<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ isNew ? '新增文章' : '編輯文章' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                  v-model.trim="tempArticle.image">
              </div>
              <img class="img-fluid" :alt="tempArticle.title" v-if="tempArticle.image" :src="tempArticle.image">
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempArticle.title">
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="date" class="form-label">日期</label>
                  <input type="date" class="form-control" id="date" placeholder="請輸入日期" v-model="tempArticle.date">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="author" class="form-label">作者</label>
                  <input type="text" class="form-control" id="author" placeholder="請輸入作者"
                    v-model.trim="tempArticle.author">
                </div>
              </div>
              <div class="row gx-2">
                <div class="col-md-6">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="輸入文章標籤" aria-label="Recipient’s username"
                      v-model="tag" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                      @click="addTag">加入</button>
                  </div>
                </div>
                <div class="col-md-6">
                  <span v-for="t in tempArticle.tag" :key="t" class="badge bg-secondary me-2">
                    {{ t }}
                  </span>
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="content" class="form-label">文章內容</label>
                <textarea type="text" rows="8" class="form-control" id="content" placeholder="請輸入文章內容"
                  v-model.trim="tempArticle.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isPublic" v-model="tempArticle.isPublic">
                  <label class="form-check-label" for="isPublic">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateArticle">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
export default {
  mixins: [modalMixin],
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    article() {
      this.tempArticle = { ...this.article, tag: this.article.tag || [] };
    }
  },
  data() {
    return {
      modal: {},
      tempArticle: {
        tag: []
      },
      tag: ''
    }
  },
  methods: {
    updateArticle() {
      if (this.isNew) {
        this.$emit('add-article', this.tempArticle);
      } else {
        this.$emit('update-article', this.tempArticle);
      }
    },
    addTag() {
      if (this.tag && !this.tempArticle?.tag?.includes(this.tag)) {
        this.tempArticle.tag.push(this.tag);
        this.tag = '';
      }
    }
  }
}
</script>