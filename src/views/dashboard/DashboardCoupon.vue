<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container">
    <div class="d-flex justify-content-end pt-10">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th width="120">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td class="text-right">
            {{ coupon.due_date }}
          </td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, coupon)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteCoupon(coupon)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <ThePagination :pagination="pagination" @change-page="getCoupons" />
    </div>
  </div>
  <CouponModal ref="couponModal" :coupon="tempCoupon" :isNew="isNew" @update-coupon="updateCoupon"
    @add-coupon="addCoupon"></CouponModal>
</template>
<script>
import couponStore from '@/stores/couponStore';
import statusStore from '@/stores/statusStore';
import ThePagination from '@/components/ThePagination.vue';
import CouponModal from '@/components/dashboard/CouponModal.vue';
import sweetAlert from '@/tools/alert';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      tempCoupon: {},
      isNew: false,
    }
  },
  components: {
    CouponModal,
    ThePagination
  },
  computed: {
    ...mapState(couponStore, ['coupons', 'pagination']),
    ...mapState(statusStore, ['isLoading']),
  },
  methods: {
    ...mapActions(couponStore, ['getCoupons', 'addAdminCoupon', 'updateAdminCoupon', 'deleteAdminCoupon']),
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew
      this.$refs.couponModal.showModal();
    },
    async addCoupon(coupon) {
      this.$refs.couponModal.hideModal();
      await this.addAdminCoupon(coupon);
    },
    async updateCoupon(coupon) {
      this.$refs.couponModal.hideModal();
      await this.updateAdminCoupon(coupon);
    },
    async deleteCoupon(coupon) {
      const res = await sweetAlert.alertDelete(coupon);
      if (res.isConfirmed) {
        await this.deleteAdminCoupon(coupon);
      }
    },
  },
  created() {
    this.getCoupons();
  },
}
</script>