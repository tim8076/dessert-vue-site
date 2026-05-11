<template>
  <!-- 請同學自行新增 v-model -->
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯訂單: {{ tempOrder.id }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="mb-3">
              <label for="name" class="form-label">訂購人</label>
              <input type="text" class="form-control" id="name" placeholder="請輸入訂購人" v-model="tempOrder.user.name">
            </div>
            <div class="mb-3">
              <p for="product" class="form-label">購買商品</p>
              <div class="d-flex align-items-center">
                <p v-for="product in Object.values(tempOrder.products)" :key="product.id" class="me-3">
                  {{ product.product.title }} x {{ product.qty }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="address" class="form-label">地址</label>
                <input type="text" class="form-control" id="address" placeholder="請輸入地址"
                  v-model="tempOrder.user.address">
              </div>
              <div class="mb-3 col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" placeholder="請輸入Email"
                  v-model="tempOrder.user.email">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="tel" class="form-label">電話</label>
                <input type="number" class="form-control" id="tel" placeholder="請輸入電話" v-model="tempOrder.user.tel">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">訂單金額</label>
                <input type="number" class="form-control" id="price" placeholder="請輸入訂單金額" v-model="tempOrder.total">
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <label for="content" class="form-label">留言</label>
              <textarea type="text" class="form-control" id="content" placeholder="請輸入留言"
                v-model="tempOrder.message"></textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_paid" v-model="tempOrder.is_paid">
                <label class="form-check-label" for="is_paid">
                  是否付款
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-order', tempOrder)">
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
  props: {
    order: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = { ...this.order };
    }
  },
  data() {
    return {
      modal: {},
      tempOrder: {
        user: {},
        products: {}
      }
    }
  },
}
</script>