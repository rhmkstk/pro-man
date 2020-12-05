<template>
  <div>
    <Progress :prog="calcProgresses" />
    <div class="worksaceContent">
      <div class="listWrapper">
        <Draggable :disabled="true" class="listWrapper">
          <div
            class="listContainer"
            v-for="(item, index) in getTasks"
            :key="index"
          >
          <CardContainer 
            :item="item"
            :index="index"
            @startAdding="startAdding(item)"
            @addNewCard="addNewCard(index)"
            @input="takeInputValue"
          />
            <Draggable
              :list="item.cards"
              v-bind="dragOptions"
              @start="startDragging(item)"
              @end="dragging = false"
              @change="saveChanges"
              :move="onMove"
            >
              <section
                class="listItems"
                v-for="card in item.cards"
                :key="card.id"
              >
                <Card 
                  :text="card.text"
                  :tag="card.tag"
                  :pin="card.pin"
                  @startEditingCard="startEditingCard(card)" />
              </section>
            </Draggable>
          </div>
        </Draggable>
      </div>
      <CustomPopup :isPopupShow="isItemEditing">
        <div class="popupContent">
          <IconX class="closePopupIcon" @click="closeEditPopup" />
          <input
            type="text"
            class="editInput"
            v-model="editCardText"
            ref="editCardInput"
          />
          <div class="popupTransactions">
            <IconGarbage
              class="garbageIcon"
              width="25px"
              height="25px"
              @click="deleteCard"
            />
            <IconPin class="pinIcon" @click="fixCard" />
            <section class="transactionTag">
              <IconTag
                @click="isTagsActive = !isTagsActive"
                class="tagIcon"
                :class="isTagsActive ? 'tagActive' : ''"
              />
              <span class="tags" :class="isTagsActive ? 'tagsActive' : ''">
                <span
                  v-for="(tag, i) in tags"
                  :key="i"
                  class="tag"
                  :class="tag.className"
                  @click="setTag(tag)"
                ></span>
              </span>
            </section>
            <button class="editSave" @click="editCard">Save</button>
          </div>
        </div>
      </CustomPopup>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Draggable from 'vuedraggable'

import CustomPopup from '@/components/Popup.vue'
import Card from '@/components/Card'
import CardContainer from '@/components/CardContainer'
import Progress from '@/components/Progress'

import IconGarbage from '@/components/icons/garbage.svg'
import IconPin from '@/components/icons/pin.svg'
import IconX from '@/components/icons/x.svg'
import IconTag from '@/components/icons/tag.svg'

export default {
  name: 'Workspace',
  components: {
    Progress,
    Draggable,
    CardContainer,
    Card,
    CustomPopup,
    IconGarbage,
    IconPin,
    IconX,
    IconTag,
    
  },
  data() {
    return {
      dragging: false,
      cardTransactions: false,
      addNewItem: false,
      isTagsActive: false,
      isItemEditing: false,
      selectedCard: {},
      newCardText: '',
      prevStage: '',
      editCardText: '',
      cardTitles: [
        { id: 0, name: 'To Do', add: false, jobs: [] },
        { id: 1, name: 'In-Progress', add: false, jobs: [] },
        { id: 3, name: 'Done', add: false, jobs: [] }
      ],
      tags: [
        { className: 'red' },
        { className: 'yellow' },
        { className: 'green' },
        { className: 'blue' },
        { className: 'gray' }
      ]
    }
  },
  watch: {
    isItemEditing: function(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.editCardInput.focus()
        }, 200)
      }
    }
  },
  methods: {
    takeInputValue(val){
      this.newCardText = val
    },
    addNewCard(index) {
      if (this.newCardText) {
        this.$store.dispatch('addNewCard', {
          key: this.$store.state.activeWsKey,
          i: index.toString(),
          newCard: {
            text: this.newCardText,
            edit: false,
            tag: { is: false, class: '' },
            pin: false
          }
        })
      }
    },
    findStageOfMovedItem(key) {
      let i
      this.getTasks.map((task, index) => {
        let isIt = task.cards.findIndex(c => c.key == key)
        if (isIt != -1) {
          i = index
          // return
        }
      })
      return i
    },
    startAdding(i) {
      this.getTasks.map(task =>
        task.name == i.name ? (task.add = !task.add) : (task.add = false)
      )
    },
    startDragging(item) {
      this.dragging = true
      this.prevStage = item.name
    },
    reOrderCards(stage, infos) {
      this.getTasks[stage].cards.map((card, i) => {
        card.order = i.toString()
        infos.card = card
        this.$store.dispatch('updateCardInfos', infos)
      })
    },
    saveChanges(evt) {
      if (evt.removed) {
        const infos = {
          cardKey: evt.removed.element.key,
          stage: this.showPrevStage,
          activeWsKey: this.$store.state.activeWsKey
        }
        this.$store.dispatch('deleteCard', infos)
      }
      if (evt.added) {
        const infos = {
          cardKey: evt.added.element.key,
          stage: this.findStageOfMovedItem(evt.added.element.key),
          activeWsKey: this.$store.state.activeWsKey,
          card: evt.added.element
        }
        this.reOrderCards(infos.stage, infos)
      }
      if (evt.moved) {
        const infos = {
          stage: this.findStageOfMovedItem(evt.moved.element.key),
          activeWsKey: this.$store.state.activeWsKey
        }
        this.reOrderCards(infos.stage, infos)
      }
    },
    startEditingCard(card) {
      this.isItemEditing = !this.isItemEditing
      card.edit = !card.edit
      this.editCardText = card.text
      this.selectedCard.card = card
      this.selectedCard.stage = this.findStageOfMovedItem(card.key)
      this.selectedCard.activeWsKey = this.$store.state.activeWsKey
      this.selectedCard.cardKey = card.key
    },
    deleteCard() {
      this.selectedCard.updateTasks = true
      this.$store.dispatch('deleteCard', this.selectedCard)
      this.isItemEditing = false
    },
    setTag(tag) {
      this.selectedCard.card.tag = { is: true, class: tag.className }
      this.$store.dispatch('updateCardInfos', this.selectedCard)
      this.isItemEditing = false
      this.isTagsActive = false
    },
    editCard() {
      if (this.editCardText != this.selectedCard.card.text) {
        this.selectedCard.card.text = this.editCardText
        this.$store.dispatch('updateCardInfos', this.selectedCard)
        this.isItemEditing = false
      }
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.pin) && !draggedElement.pin
    },
    fixCard() {
      this.selectedCard.card.pin = !this.selectedCard.card.pin
      this.$store.dispatch('updateCardInfos', this.selectedCard)
    },
    closeEditPopup() {
      this.isItemEditing = false
      this.isTagsActive = false
    }
  },
  computed: {
    ...mapGetters(['getTasks']),
    calcProgresses() {
      if (this.getTasks.length) {
        const todos = this.getTasks[0].cards.length
        const progress = this.getTasks[1].cards.length
        const done = this.getTasks[2].cards.length
        const total = todos + progress + done
        const completed = (100 / (total / done)).toFixed(2)
        const inProgress = (100 / (total / progress)).toFixed(2)
        return {
          completed,
          inProgress
        }
      }
      return {
        completed: 0,
        inProgress: 0
      }
    },
    showPrevStage() {
      return this.prevStage == 'To Do' ? 0 : this.prevStage == 'Done' ? 2 : 1
    },
    dragOptions(){
      return {
        ghostClass: "ghost",
        animation: "220",
        group: "cards",
        disabled: false
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('getTasks')
  },
  beforeDestroy() {
    this.$store.state.tasks = []
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.worksaceContent {
  padding: 30px 100px;
  display: flex;
  justify-content: center;
}
.listWrapper {
  width: 55vw;
  display: flex;
  justify-content: space-between;
}
.listContainer {
  background: var(--c-default);
  width: 300px;
  height: 70vh;
  color: #fff;
  padding: 20px 0px;
  overflow-y: scroll;
}
.listContainer::-webkit-scrollbar {
  display: none !important;
}
.cardTransactionItem {
  position: absolute;
  right: 0;
  /* top: calc(100% + 10px); */
  top: 100%;
  color: #fff;
  background: var(--c-bg);
  padding: 3px;
}
.cardTransactionItem div + div {
  margin-top: 5px;
}
.newItemAdd {
  min-height: 100%;
  background: var(--c-add);
  color: var(--c-light);
  padding: 4px;
  font-size: 1rem;
  margin-left: 10px;
  border-radius: 3px;
}
.newItemClose {
  min-height: 100%;
  background: var(--c-danger);
  color: #fff;
  padding: 0px 8px;
  font-size: var(--fs-big);
  margin-left: 10px;
  border-radius: 3px;
}
.ghost {
  opacity: 0.3;
  /* background: var(--c-dark); */
  background: var(--c-highlight);
  margin: 12px;
}
.popupTransactions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 4vh;
}
.closePopupIcon {
  position: absolute;
  top: 5px;
  right: 3px;
  cursor: pointer;
}
.editInput {
  min-width: 17vw;
  padding: 8px;
  border-radius: 4px;
  outline-color: var(--c-highlight);
  font-size: 1rem;
  height: 6vh;
}
.editSave {
  font-size: 1.1rem;
  background: var(--c-primary);
  color: var(--c-light);
  padding: 4px;
  border-radius: 6px;
  width: 5vw;
  align-self: center;
}
.garbageIcon,
.pinIcon,
.tagIcon {
  cursor: pointer;
  color: var(--c-text);
  transition: 150ms all;
}
.garbageIcon:hover {
  transform: scale(1.2);
  color: var(--c-danger);
}
.pinIcon:hover {
  transform: scale(1.2);
  color: var(--c-warning);
}
.tagIcon:hover {
  transform: scale(1.2) rotate(45deg);
  color: var(--c-highlight);
}
.tagActive {
  transform: scale(1.2) rotate(45deg);
  color: var(--c-highlight);
}
.transactionTag {
  display: flex;
  flex-direction: column;
  position: relative;
}
.tags {
  position: absolute;
  top: 110%;
  left: 50%;
  background: var(--c-dark);
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: 200ms all;
  border-radius: 4px;
}
.tag {
  width: 20px;
  height: 20px;
  border-radius: 99px;
  cursor: pointer;
}
.tag + .tag {
  margin-left: 14px;
}
.tagsActive {
  visibility: visible;
  opacity: 1;
}


</style>
