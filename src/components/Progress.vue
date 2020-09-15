<template>
  <div class="container">
    <label class="bar done"> <span class="percent">%</span> 30 </label>
    <label class="bar inProgress"> <span class="percent">%</span> 20 </label>
  </div>
</template>
<style scoped>
.container {
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
