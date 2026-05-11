<template>
  <ul class="pagination-list">
    <li class="pagination-list-item">
      <a href="#" class="pagination-list-arrow" :class="{ disabled: currentPage === 1 }"
        @click.prevent="$emit('page-change', currentPage - 1)">
        <ChevronLeftIcon />
      </a>
    </li>
    <li class="pagination-list-item" :class="{ active: currentPage === page }" v-for="page in totalPages" :key="page">
      <a href="#" @click.prevent="$emit('page-change', page)">
        {{ page }}
      </a>
    </li>
    <li class="pagination-list-item">
      <a href="#" class="pagination-list-arrow" :class="{ disabled: currentPage === totalPages }"
        @click.prevent="$emit('page-change', currentPage + 1)">
        <ChevronRightIcon />
      </a>
    </li>
  </ul>
</template>
<script>
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/16/solid';

export default {
  name: 'FrontPagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    }
  },
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
  },
};
</script>