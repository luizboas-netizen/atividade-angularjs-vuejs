<script>
export default {
  name: 'ToastNotification',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  computed: {
    titulo() {
      const titulos = {
        success: 'Sucesso',
        error: 'Erro',
        info: 'Informação'
      }

      return titulos[this.type] || 'Notificação'
    }
  }
}
</script>

<template>
  <div
    v-if="visible"
    class="toast-component"
    :class="type"
    role="status"
  >
    <div class="toast-content">
      <strong>{{ titulo }}</strong>
      <p>{{ message }}</p>
    </div>

    <button
      class="toast-close"
      @click="$emit('close')"
      aria-label="Fechar notificação"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.toast-component {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  width: min(360px, calc(100vw - 32px));
  padding: 17px;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-left: 4px solid #188653;
  animation: aparecer 0.3s ease;
}

.toast-component.error {
  border-left-color: #dc4545;
}

.toast-component.info {
  border-left-color: #3985d6;
}

.toast-content strong {
  display: block;
  margin-bottom: 5px;
  color: #26352d;
  font-size: 14px;
}

.toast-content p {
  margin: 0;
  color: #718077;
  font-size: 13px;
  line-height: 1.5;
}

.toast-close {
  border: none;
  background: transparent;
  color: #718077;
  font-size: 22px;
  cursor: pointer;
}

.toast-close:hover {
  color: #26352d;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .toast-component {
    top: 12px;
    right: 12px;
  }
}
</style>