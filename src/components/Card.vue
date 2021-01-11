<template>
  <div class="card">
    <span class="cardIcon" @click="startEditingCard">
      <IconEdit />
    </span>
    <span class="cardPinnedIcon" v-if="pin" @click="clearPin">
      <IconPinRotate stroke="#485460" />
    </span>
    <span class="cardText">
      {{ text }}
    </span>
    <span
      v-if="tag.is"
      class="cardTag"
      :class="tag.class"
      @click="clearTag"
    ></span>
  </div>
</template>
<script>
import IconEdit from '@/components/icons/edit.svg'
import IconPinRotate from '@/components/icons/pinRotate.svg'
export default {
  name: 'Card',
  components: {
    IconEdit,
    IconPinRotate
  },
  props: {
    text: {
      type: String,
      required: true
    },
    tag: {
      type: Object,
      required: true
    },
    pin: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    startEditingCard() {
      this.$emit('startEditingCard')
    },
    clearTag() {
      this.$emit('clearTag')
    },
    clearPin() {
      this.$emit('clearPin')
    }
  }
}
</script>
<style scoped>
.card {
  background: var(--c-dark);
  margin: 12px;
  padding: 8px 0px 8px 10px;
  cursor: move;
}
.card:hover .cardIcon {
  display: block;
}
.cardIcon {
  background: var(--c-bg);
  color: var(--c-light);
  height: 38px;
  float: right;
  padding: 6px;
  margin: -8px 0px 0px 0px;
  display: none;
  position: relative;
  cursor: pointer;
}
.cardIcon * {
  width: 100%;
  height: 100%;
}
.cardPinnedIcon {
  display: inline-flex;
  float: left;
  cursor: pointer;
  margin-left: -4px;
  margin-right: 4px;
}
.cardTag {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  display: inline-block;
  cursor: pointer;
}
</style>
