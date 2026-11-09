
<script>
export default {
  name: 'ProgressBar',

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    percentual() {
      return Math.min(100, Math.max(0, this.value))
    }
  }
}
</script>

<template>
  <div class="progress-component">
    <div class="progress-info">
      <span>Progresso</span>
      <strong>{{ percentual }}%</strong>
    </div>

    <div
      class="progress-track"
      role="progressbar"
      :aria-valuenow="percentual"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="progress-fill"
        :style="{ width: percentual + '%' }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-component {
  width: 100%;
  margin: 12px 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
  font-size: 13px;
  color: #718077;
}

.progress-info strong {
  color: #188653;
}

.progress-track {
  width: 100%;
  height: 11px;
  background: #e8eee9;
  border-radius: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #188653;
  border-radius: 20px;
  transition: width 0.4s ease;
}
</style>
