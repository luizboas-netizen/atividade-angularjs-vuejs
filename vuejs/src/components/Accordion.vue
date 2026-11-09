
<script>
export default {
  name: 'Accordion',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      itemAberto: null
    }
  },

  methods: {
    alternarItem(index) {
      this.itemAberto =
        this.itemAberto === index ? null : index
    }
  }
}
</script>

<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion-item"
    >
      <button
        class="accordion-header"
        :class="{ active: itemAberto === index }"
        @click="alternarItem(index)"
      >
        <span>{{ item.titulo }}</span>

        <span class="accordion-icon">
          {{ itemAberto === index ? '−' : '+' }}
        </span>
      </button>

      <div
        class="accordion-content"
        :class="{ expanded: itemAberto === index }"
      >
        <p>{{ item.conteudo }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  width: 100%;
}

.accordion-item {
  border-bottom: 1px solid #e5ebe7;
}

.accordion-header {
  width: 100%;
  border: 0;
  background: #fff;
  color: #26352d;
  padding: 15px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
}

.accordion-header:hover,
.accordion-header.active {
  color: #188653;
}

.accordion-icon {
  font-size: 21px;
  font-weight: 400;
}

.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.accordion-content p {
  overflow: hidden;
  color: #718077;
  font-size: 13px;
  line-height: 1.6;
  padding: 0 5px;
}

.accordion-content.expanded {
  grid-template-rows: 1fr;
}

.accordion-content.expanded p {
  padding: 5px 5px 15px;
}
</style>
