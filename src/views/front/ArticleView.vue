<template>
  <div class="article-view min-h-screen">
    <div class="container min-h-screen py-4 py-md-10">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="mb-4">{{ article.title }}</h1>
          <p class="mb-4 mb-md-10">文章日期: {{ article.date }}</p>
          <img :src="article.imageUrl" alt="Article Image" class="w-100 mb-4 mb-md-10 object-fit-cover">
          <p class="mb-4 mb-md-10 fs-md-5">{{ article.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import new1Image from '@/assets/image/home/news-1.svg';
import new2Image from '@/assets/image/home/news-2.svg';
import new3Image from '@/assets/image/home/news-3.svg';
export default {
  name: 'ArticleView',
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
  },
  computed: {
    article() {
      const id = this.$route.params.id;
      return this.articles.find(article => article.id === Number(id));
    }
  }
}
</script>