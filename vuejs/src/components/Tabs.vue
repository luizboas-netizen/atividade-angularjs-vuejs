<script>
export default {
  name: 'Tabs',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      abaAtiva: 0
    }
  },
  methods: {
    selecionarAba(index) {
      this.abaAtiva = index
    }
  }
}
</script>

<template>
  <div class="tabs-component" v-if="items.length">
    <div class="tabs-header">
      <button
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: abaAtiva === index }"
        @click="selecionarAba(index)"
      >
        {{ item.titulo }}
      </button>
    </div>

    <div class="tabs-content">
      <p>{{ items[abaAtiva].conteudo }}</p>
    </div>
  </div>
</template>

<style scoped>
.tabs-component {
  width: 100%;
}

.tabs-header {
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #e5ebe7;
  overflow-x: auto;
}

.tabs-header button {
  padding: 12px 16px;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: #718077;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.tabs-header button:hover,
.tabs-header button.active {
  color: #188653;
}

.tabs-header button.active {
  border-bottom-color: #188653;
}

.tabs-content {
  padding: 18px 5px;
  color: #59675f;
  font-size: 13px;
  line-height: 1.6;
}
</style>