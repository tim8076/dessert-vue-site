<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th>Email</th>
          <th width="120">購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.create_at }}</td>
          <td>{{ order.user.email }}</td>
          <td class="text-right">
            <p v-for="product in Object.values(order.products)" :key="product.id">
              {{ product.product.title }} x {{ product.qty }}
            </p>
          </td>
          <td class="text-right">
            {{ order.total }}
          </td>
          <td>
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(order)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteOrder(order)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <ThePagination :pagination="pagination" @change-page="getOrders" />
    </div>
  </div>
  <OrderModal ref="orderRef" :order="tempOrder" @update-order="updateOrder"></OrderModal>
</template>
<script>
import OrderModal from '@/components/dashboard/OrderModal.vue';
import orderStore from '@/stores/orderStore';
import statusStore from '@/stores/statusStore';
import sweetAlert from '@/tools/alert';
import ThePagination from '@/components/ThePagination.vue';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      tempOrder: {},
    }
  },
  components: {
    OrderModal,
    ThePagination,
  },
  computed: {
    ...mapState(orderStore, ['orders', 'pagination']),
    ...mapState(statusStore, ['isLoading']),
  },
  methods: {
    ...mapActions(orderStore, ['getOrders', 'updateAdminOrder', 'deleteAdminOrder']),
    openModal(order) {
      this.tempOrder = order;
      this.$refs.orderRef.showModal();
    },
    updateOrder(order) {
      this.$refs.orderRef.hideModal();
      this.updateAdminOrder(order);
    },
    async deleteOrder(order) {
      const res = await sweetAlert.alertDelete(order);
      if (res.isConfirmed) {
        // 刪除產品
        await this.deleteAdminOrder(order);
      }
    }
  },
  mounted() {
    this.getOrders();
  },
}
</script>