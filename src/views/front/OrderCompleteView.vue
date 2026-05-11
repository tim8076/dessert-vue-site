<template>
  <div class="order-complete min-h-screen">
    <div class="container py-4 py-md-15">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-8">
          <div class="mb-4 mb-lg-8 p-4 p-md-8 bg-light rounded text-dark border border-primary border-3">
            <p class="mb-3">訂單已完成！</p>
            <p>感謝您的訂購，我們已成功收到您的訂單。</p>
            <p class="mb-3">我們將盡快為您處理並安排出貨。</p>

            <p class="mb-0">訂單編號：#{{ orderId }}</p>
            <p>出貨通知將寄送至您的 Email，請留意信箱。</p>
            <p class="mb-0">如有任何問題，歡迎隨時與我們聯繫。</p>
          </div>
          <div class="text-center">
            <router-link class="btn btn-primary btn-lg" to="/">
              回首頁
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: this.$route.params.id,
    };
  },
}
</script>