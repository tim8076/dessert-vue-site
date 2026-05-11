<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ isNew ? '新增優惠券' : '編輯優惠券' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                    v-model.trim="tempCoupon.title">
                </div>
              </div>
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">折扣百分比</label>
                <input type="number" class="form-control" id="category" placeholder="請輸入折扣百分比"
                  v-model.trim="tempCoupon.percent">
              </div>
              <div class="mb-3 col-md-6">
                <label for="date" class="form-label">日期</label>
                <input type="date" class="form-control" id="date" placeholder="請輸入日期" v-model="tempCoupon.due_date">
              </div>
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">折扣碼</label>
                <input type="text" class="form-control" id="origin_price" placeholder="請輸入折扣碼"
                  v-model.trim="tempCoupon.code">
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled"
                  v-model="tempCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateCoupon">
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
  name: 'CouponModal',
  mixins: [modalMixin],
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    coupon: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };
    }
  },
  data() {
    return {
      modal: {},
      tempCoupon: {}
    }
  },
  methods: {
    updateCoupon() {
      if (this.isNew) {
        this.$emit('add-coupon', this.tempCoupon);
      } else {
        this.$emit('update-coupon', this.tempCoupon);
      }
    }
  }
}
</script>