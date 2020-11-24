<template>
  <div class="popup" :class="isPopupShow ? 'popupActive' : '' ">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'customPopup',
  props: {
    isPopupShow:{
      type: Boolean,
      default: false,
      required: true
    }
  }

}
</script>

<style scoped>
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--c-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: 300ms all;
}
.popup > :first-child{
  padding: 40px 30px;
  position: absolute;
  background: var(--c-bg);
  display: flex;
  flex-direction: column;
  border-radius: 4px;
}
.popupActive {
  visibility: visible;
  opacity: 1;
}
</style>