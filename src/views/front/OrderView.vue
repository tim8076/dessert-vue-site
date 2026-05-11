<template>
  <div class="order-view min-h-screen">
    <div class="container py-4 py-md-15">
      <div class="row">
        <div class="col-md-6">
          <h1 class="fs-4 mb-4">訂單商品</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">商品</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">總計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <th scope="row">
                  <router-link class="d-flex align-items-center gap-2 gap-lg-8" :to="`/product/${item.product.id}`">
                    <img class="table-image" :src="item.product.imageUrl" alt="">
                    <p class="text-dark">{{ item.product.title }}</p>
                  </router-link>
                </th>
                <td>{{ item.product.price }}</td>
                <td>
                  {{ item.qty }}
                </td>
                <td>{{ item.total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="4">
                  <div class="d-flex align-items-center justify-content-end gap-2">
                    <input type="text" class="form-control coupon-input" placeholder="輸入優惠券代碼" v-model="couponCode">
                    <button type="button" class="btn btn-outline-primary flex-shrink-0" @click="applyCoupon"
                      :disabled="!couponCode">套用</button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colspan="3" class="text-end">
                  <span v-if="cart.final_total < cart.total" class="me-3 text-success">已套用優惠券</span>總計
                </th>
                <th>{{ Math.round(cart.final_total) }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="col-md-6">
          <h2 class="fs-4 mb-4">訂單資訊</h2>
          <VForm class="w-100 row justify-content-center" v-slot="{ errors }" @submit="signIn">
            <div class="mb-2">
              <label for="name" class="sr-only mb-3">訂購人姓名</label>
              <VField type="text" id="name" class="form-control border-gray-500" placeholder="訂購人姓名" autofocus
                name="name" v-model="order.username" rules="required" :class="{ 'is-invalid': errors['name'] }" />
              <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="mb-2">
              <label for="email" class="sr-only mb-3">E-mail</label>
              <VField type="text" id="email" class="form-control border-gray-500" placeholder="E-mail" autofocus
                name="email" v-model="order.email" rules="required|email" :class="{ 'is-invalid': errors['email'] }" />
              <ErrorMessage name="email" class="text-danger" />
            </div>
            <div class="mb-2">
              <label for="tel" class="sr-only mb-3">訂購人電話</label>
              <VField type="text" id="tel" class="form-control border-gray-500" placeholder="訂購人電話" autofocus name="tel"
                v-model="order.tel" rules="required|numeric|min:8" :class="{ 'is-invalid': errors['tel'] }" />
              <ErrorMessage name="tel" class="text-danger" />
            </div>
            <div class="mb-2">
              <label for="address" class="sr-only mb-3">訂購人地址</label>
              <VField type="text" id="address" class="form-control border-gray-500" placeholder="訂購人地址" autofocus
                name="address" v-model="order.address" rules="required" :class="{ 'is-invalid': errors['address'] }" />
              <ErrorMessage name="address" class="text-danger" />
            </div>
            <div class="mb-2">
              <label for="comment" class="sr-only mb-3">留言</label>
              <textarea name="comment" id="comment" class="form-control border-gray-500" placeholder="輸入留言"
                v-model="comment" style="resize: none;" rows="5"></textarea>
            </div>
            <div class="text-end mt-4">
              <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="!isFormValid || isLoading"
                @click="sendUserOrder">
                送出訂單
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import couponStore from '@/stores/couponStore';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      couponCode: '',
      order: {
        username: '',
        email: '',
        tel: '',
        address: '',
      },
      comment: '',
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(cartStore, ['cart']),
    isFormValid() {
      return this.order.username && this.order.email && this.order.tel && this.order.address;
    },
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(couponStore, ['useCoupon']),
    ...mapActions(orderStore, ['sendOrder']),
    async applyCoupon() {
      if (!this.couponCode) {
        return;
      }
      await this.useCoupon(this.couponCode);
      await this.getCart();
    },
    async sendUserOrder() {
      const orderData = {
        user: {
          name: this.order.username,
          email: this.order.email,
          tel: this.order.tel,
          address: this.order.address,
        },
        comment: this.comment,
      };
      const res = await this.sendOrder(orderData);
      this.$router.push(`/orderComplete/${res.data.orderId}`);
      this.getCart();
    }
  },
  created() {
    this.getCart();
  }
}
</script>