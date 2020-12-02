<template>
  <div>
    <section class="listHeader">
      <span>{{ item.name }}</span>
      <section class="listIcons">
        <IconAdd class="listIcon add" @click="startAdding" />
        <IconMore class="listIcon more" />
      </section>
    </section>
    <section class="addingNewItem" v-if="item.add">
      <!-- ref="newItemInput" -->
      <input 
        type="text" 
        v-model="newCard"
        v-on:input="sendInputValue"
        @keyup.enter="addNewCard" 
      />
      <button @click="addNewCard" class="newItemAddBtn">
        <IconAdd />
      </button>
    </section>
  </div>
</template>

<script>
import IconAdd from './icons/add.svg'
import IconMore from './icons/more.svg'
export default {
  name: 'CardContainer',
  components: {
    IconAdd,
    IconMore
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    newCardText:{
      type: String
    }
  },
  data() {
    return {
      newCard: ''
    }
  },
  methods: {
    startAdding() {
      this.$emit('startAdding')
    },
    addNewCard() {
      this.$emit('addNewCard')
      this.newCard = ''
    },
    sendInputValue(){
      this.$emit('input', this.newCard)
    }
  }
}
</script>

<style scoped>
.listHeader {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.listHeader span {
  font-size: var(--fs-title);
  margin-left: 8px;
}
.listIcons {
  opacity: 0.6;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.listIcon {
  margin-left: 5px;
  cursor: pointer;
}
.listIcon:hover {
  color: var(--c-highlight);
}
.listIcons .more {
  transform: rotate(90deg);
  width: 26px;
  height: 26px;
}
.addingNewItem {
  display: flex;
  min-height: 35px;
  margin: 15px 12px;
}
.addingNewItem input {
  outline-color: var(--c-highlight);
  flex: 1;
  color: #fff;
  font-size: 1rem;
  padding-left: 6px;
  border: none;
  background: var(--c-bg);
  border-radius: 3px;
}
.newItemAddBtn {
  min-height: 100%;
  width: 1.8vw;
  background: var(--c-add);
  color: var(--c-light);
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
