<template>
  <LoadingComponent :active="isLoading" color="#926D62" :width="60" :height="60"></LoadingComponent>
  <div class="cart-view min-h-screen">
    <div
      class="position-relative container d-flex justify-content-between align-items-center py-2 py-lg-8 border-bottom border-gray-300">
      <ul class="nav-list">
        <li>
          <router-link class="nav-list-link" to="/">首頁</router-link>
        </li>
        <li>
          <p class="nav-list-link active">購物車</p>
        </li>
      </ul>
    </div>
    <div class="container pb-12 pt-lg-18 pb-lg-33">
      <template v-if="cart?.carts?.length">
        <div class="d-flex justify-content-end py-2 py-md-4">
          <button type="button" class="btn btn-danger" @click="removeAllCart">清空購物車</button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">商品</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">總計</th>
                <th scope="col">操作</th>
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
                  <div class="input-group mb-3 w-lg-25">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" @click="updateCartItem({
                      cart_id: item.id,
                      product_id: item.product.id,
                      qty: item.qty > 1 ? item.qty - 1 : 1
                    })">
                      -
                    </button>
                    <input type="number" class="form-control num-input border-primary text-center flex-grow-0" min="1"
                      @change="updateCartItem({ cart_id: item.id, product_id: item.product.id, qty: Number($event.target.value) })"
                      :value="item.qty">
                    <button class="btn btn-outline-primary" type="button" id="button-addon2"
                      @click="updateCartItem({ cart_id: item.id, product_id: item.product.id, qty: item.qty + 1 })">+</button>
                  </div>
                </td>
                <td>{{ item.total }}</td>
                <td>
                  <a href="#" class="delete-btn" @click.prevent="removeCartItem(item.id)">刪除</a>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">總計</th>
                <th>{{ cart.total }}</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
          <div class="d-flex justify-content-end py-4">
            <router-link to="/order" class="btn btn-lg btn-primary">前往結帳</router-link>
          </div>
        </div>
      </template>
      <div v-else class="text-center py-12">
        <p class="fs-4 mb-6">購物車內沒有商品</p>
        <router-link to="/products" class="btn btn-lg btn-primary">去逛逛</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
export default {
  name: 'CartView',
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(cartStore, ['cart']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'removeCartItem', 'removeAllCart', 'updateCartItem']),
  },
  created() {
    this.getCart();
  }
}
</script>