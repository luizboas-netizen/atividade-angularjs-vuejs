<script>
export default {
  name: 'DropdownMenu',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['select'],
  data() {
    return {
      menuAberto: false
    }
  },
  mounted() {
    document.addEventListener('click', this.fecharAoClicarFora)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.fecharAoClicarFora)
  },
  methods: {
    alternarMenu() {
      this.menuAberto = !this.menuAberto
    },
    selecionarOpcao(opcao) {
      this.$emit('select', opcao)
      this.menuAberto = false
    },
    fecharAoClicarFora(event) {
      if (
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target)
      ) {
        this.menuAberto = false
      }
    }
  }
}
</script>

<template>
  <div class="dropdown-component" ref="dropdown">
    <button
      class="dropdown-trigger"
      @click="alternarMenu"
      :aria-expanded="menuAberto"
    >
      Opções
      <span>{{ menuAberto ? '▲' : '▼' }}</span>
    </button>

    <div class="dropdown-options" v-if="menuAberto">
      <button
        v-for="(opcao, index) in options"
        :key="index"
        @click="selecionarOpcao(opcao)"
      >
        {{ opcao }}
      </button>

      <p v-if="!options.length">Nenhuma opção disponível.</p>
    </div>
  </div>
</template>

<style scoped>
.dropdown-component {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  border: 1px solid #dce5df;
  border-radius: 7px;
  background: #fff;
  color: #26352d;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.dropdown-trigger:hover {
  border-color: #188653;
  color: #188653;
}

.dropdown-options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 180px;
  padding: 6px;
  background: #fff;
  border: 1px solid #e5ebe7;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.dropdown-options button {
  display: block;
  width: 100%;
  padding: 11px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #59675f;
  text-align: left;
  font-size: 13px;
  cursor: pointer;
}

.dropdown-options button:hover {
  background: #edf7f1;
  color: #188653;
}

.dropdown-options p {
  padding: 8px;
  color: #718077;
  font-size: 12px;
}
</style>