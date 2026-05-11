<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" :class="{ disabled: !pagination.has_pre }"
          @click.prevent="getAdminProducts(pagination.current_page - 1)">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      <li class="page-item" :class="{ active: page === pagination.current_page }" v-for="page in pagination.total_pages"
        :key="page">
        <a class="page-link" href="#" @click.prevent="getAdminProducts(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" :class="{ disabled: !pagination.has_next }"
          @click.prevent="getAdminProducts(pagination.current_page + 1)">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pagination: Object,
  },
  methods: {
    getAdminProducts(page) {
      this.$emit('change-page', page);
    }
  }
}
</script>