<template>
  <div class="progressContainer">
    <label
      class="bar done"
      :class="radiusClasses.done"
      :style="{ width: `${prog.completed}%` }"
    >
      <span class="percent">%{{ prog.completed }}</span>
    </label>
    <label
      class="bar inProgress"
      :class="radiusClasses.inProg"
      :style="{ width: `${prog.inProgress}%` }"
    >
      <span class="percent">%{{ prog.inProgress }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Progress',
  props: {
    prog: {
      type: Object,
      required: true
    }
  },
  computed: {
    radiusClasses() {
      const completed = parseInt(this.prog.completed)
      const inProgress = parseInt(this.prog.inProgress)
      if (completed && inProgress)
        return { done: 'coupleDone', inProg: 'coupleInProgress' }
      if (completed && !inProgress) return { done: 'single', inProg: '' }
      if (!completed && inProgress) return { done: '', inProg: 'single' }
      return { done: '', inProg: '' }

    }
  }
}
</script>
<style scoped>
.progressContainer {
  height: 15px;
  position: relative;
  background: var(--c-dark);
  border-radius: 25px;
  padding: 10px;
  margin: 18px 8px;
  box-sizing: content-box !important;
}
.bar {
  height: 100%;
  position: relative;
  overflow: hidden;
  float: left;
  font-weight: bold;
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.done {
  width: 50%;
  background-color: rgb(43, 194, 83);
  color: #fff;
}
.inProgress {
  width: 30%;
  background-color: rgb(255, 253, 151);
  color: var(--c-dark);
}
.percent {
  font-size: 0.9rem;
}
.coupleDone {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.coupleInProgress {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.single {
  border-radius: 20px;
}
</style>
