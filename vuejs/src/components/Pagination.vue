
<script>
export default {
  name: 'Pagination',

  props: {
    totalPages: {
      type: Number,
      required: true
    },

    currentPage: {
      type: Number,
      required: true
    }
  },

  emits: ['change-page'],

  computed: {
    paginas() {
      return Array.from(
        { length: this.totalPages },
        (_, index) => index + 1
      )
    }
  },

  methods: {
    mudarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPages) {
        this.$emit('change-page', pagina)
      }
    }
  }
}
</script>

<template>
  <div class="pagination">
    <button
      @click="mudarPagina(currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      Anterior
    </button>

    <button
      v-for="pagina in paginas"
      :key="pagina"
      @click="mudarPagina(pagina)"
      :class="{ active: currentPage === pagina }"
    >
      {{ pagina }}
    </button>

    <button
      @click="mudarPagina(currentPage + 1)"
      :disabled="currentPage >= totalPages"
    >
      Próxima
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.pagination button {
  min-width: 36px;
  padding: 9px 12px;
  border: 1px solid #dce5df;
  border-radius: 7px;
  background: #fff;
  color: #59675f;
  cursor: pointer;
  font-size: 13px;
}

.pagination button:hover:not(:disabled),
.pagination button.active {
  background: #188653;
  border-color: #188653;
  color: #fff;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
