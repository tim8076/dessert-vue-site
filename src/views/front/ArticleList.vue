<template>
  <div class="article-list">
    <div class="py-2 py-lg-10 container">
      <div
        class="position-relative container d-flex justify-content-between align-items-center py-2 py-lg-10 border-bottom border-gray-300 mb-4 mb-md-10">
        <ul class="nav-list py-4">
          <li>
            <router-link class="nav-list-link" to="/">首頁</router-link>
          </li>
          <li>
            <p class="nav-list-link active">最新消息</p>
          </li>
        </ul>
      </div>
      <ul class="list-unstyled">
        <li class="mb-6 mb-md-12" v-for="article in articles" :key="article.id">
          <router-link :to="`article/${article.id}`" class="article pb-md-12  border-bottom border-gray-400 row">
            <div class="col-md-6 col-lg-4">
              <img class="article-image w-100 mb-2 mb-md-0" :src="article.imageUrl" alt="">
            </div>
            <div class="col-md-6 col-lg-8">
              <div class="article-text d-flex flex-column justify-content-between h-100">
                <div>
                  <p class="text-gray-700 mb-2 fs-7 mb-md-6">
                    {{ article.date }}
                  </p>
                  <h2 class="fs-5 title mb-2 fs-md-2">{{ article.title }}</h2>
                </div>
                <router-link to="/" class="d-none d-md-block text-primary-600">
                  了解更多
                </router-link>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import new1Image from '@/assets/image/home/news-1.svg';
import new2Image from '@/assets/image/home/news-2.svg';
import new3Image from '@/assets/image/home/news-3.svg';
export default {
  data() {
    return {
      articles: [
        {
          id: 1,
          title: '小甜點，大愛心，為毛孩帶來滿滿能量！',
          content: '在這個世界上，有許多可愛的毛孩正在流浪街頭，尋找一個溫暖的家和一碗美味的食物。和幸享屋致力於為這些毛孩提供營養豐富的小甜點，讓他們在寒冷的夜晚也能感受到溫暖和愛心。每一份小甜點都是用心製作，選用優質的食材，確保毛孩們能夠獲得足夠的能量和營養。和幸享屋希望通過這些小甜點，讓更多人關注流浪毛孩的困境，並一起努力為他們創造一個更美好的未來。',
          date: '2025-12-01',
          imageUrl: new1Image,
        },
        {
          id: 2,
          title: '甜點與地球同行，種下100棵新希望！',
          content: '甜點與地球同行，讓每一口美味都成為對環境的溫柔承諾。我們發起「種下100棵新希望」計畫，邀請你在享受甜點的同時，也為地球盡一份心力。每一筆訂單，都將轉化為實際的行動，替土地種下一棵樹，為未來留下更多綠意與生機。當甜點的香氣蔓延，也讓希望悄悄扎根，陪伴這片土地持續成長。現在就加入我們，一起用甜點，為地球種下更美好的明天。',
          imageUrl: new2Image,
          date: '2026-01-15',
        },
        {
          id: 3,
          title: '一起分享幸福，送出500份溫暖餐點！',
          content: '一起分享幸福，讓甜點不只是味蕾的享受，更成為傳遞溫暖的橋樑。我們發起「送出500份溫暖餐點」行動，邀請你用一份甜點，為需要的人帶來一點光與希望。每一筆訂單，我們都將提撥部分資源，轉化為實際的關懷與支持，送到弱勢族群手中。或許只是一份簡單的點心，卻能在他們的日常中，留下難忘的溫度。現在就加入我們，讓甜點的甜，延伸成更大的善意，讓幸福持續擴散。',
          date: '2026-03-20',
          imageUrl: new3Image,
        }
      ],
    }
  }
}
</script>
