<template>
  <div class="handle">
    <div class="box add" @click="startAdding">
      <IconAdd class="iconAdd" />
      <span>Add New Worksapce</span>
    </div>
    <div class="container">
      <div
        class="box workspace"
        v-for="(item, i) in getWorkspaces"
        :key="i"
        @click="sendWorksapce(item)"
      >
        <div class="transactions">
          <IconMore class="iconMore" />
          <div class="icons">
            <IconDelete class="icon delete" @click.stop="startDeleting(item)" />
            <IconEdit class="icon edit" @click.stop="startEditing(item)" />
          </div>
        </div>
        <p class="wsName">{{ item.name }}</p>
      </div>
    </div>
    <CustomPopup :isPopupShow="addingPopup">
      <div class="popupContent">
        <IconX class="iconClose" @click="closePopup" />
        <input
          type="text"
          placeholder="Workspace name"
          class="addingİnput"
          v-model="name"
          ref="addingInput"
          :maxlength="maxTitleLength"
        />
        <section>
          <input type="radio" value="free" v-model="template" />
          <label for="free">Free</label>
          <input type="radio" value="progress" v-model="template" />
          <label for="progress">Progress</label>
        </section>
        <button class="btn add" @click="addNewWorkspace">Add</button>
      </div>
    </CustomPopup>

    <CustomPopup :isPopupShow="deletingPopup">
      <div class="popupContent">
        <IconX class="iconClose" @click="closeDeletePopup" />
        <span class="deleteWarning"
          >Are you sure to delete {{this.selectedWorkspace.name}} ?
        </span>
        <button class="btn deleteBtn" @click="deleteWorkspace">Delete</button>
      </div>
    </CustomPopup>

    <CustomPopup :isPopupShow="editingPopup">
      <div class="popupContent">
        <IconX class="iconClose" @click="cancelEditing" />
        <input
          type="text"
          v-model="editTitle"
          class="addingİnput"
          ref="editInput"
          :maxlength="maxTitleLength"
        />
        <button class="btn saveEditBtn" @click="editWorkspace">Save</button>
      </div>
    </CustomPopup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import IconAdd from '@/components/icons/add.svg'
import IconMore from '@/components/icons/more.svg'
import IconDelete from '@/components/icons/garbage.svg'
import IconEdit from '@/components/icons/edit.svg'
import IconX from '@/components/icons/x.svg'
import CustomPopup from '@/components/Custompopup.vue'


export default {
  name: 'Header',
  components: {
    IconAdd,
    IconMore,
    IconDelete,
    IconEdit,
    IconX,
    CustomPopup
  },
  data() {
    return {
      template: 'free',
      addingPopup: false,
      deletingPopup: false,
      editingPopup: false,
      name: '',
      maxTitleLength: 50,
      editTitle: '',
      selectedWorkspace: {},
      trMap: {
        çÇ: 'c',
        ğĞ: 'g',
        şŞ: 's',
        üÜ: 'u',
        ıİ: 'i',
        öÖ: 'o'
      }
    }
  },
  watch: {
    addingPopup: function(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.addingInput.focus()
        }, 100)
      }
    },
    editingPopup: function(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.editInput.select()
        }, 100)
      }
    }
  },
  methods: {
    startAdding() {
      this.addingPopup = true
    },
    addNewWorkspace() {
      this.$store.dispatch('saveNewWorkspace', {
        name: this.name,
        path: `/workspace/${this.costumEncodeURI(this.name)}`,
        tasks: [
          { name: 'To Do', add: false },
          { name: 'In Progress', add: false },
          { name: 'Done', add: false }
        ]
      })
      this.addingPopup = false
      this.name = ''
    },
    closePopup() {
      this.addingPopup = false
    },
    startDeleting(ws) {
      this.selectedWorkspace = ws
      this.deletingPopup = true
    },
    closeDeletePopup() {
      this.deletingPopup = false
    },
    deleteWorkspace() {
      this.$store.dispatch('deleteWorkspace', this.selectedWorkspace.key)
      this.deletingPopup = false
    },
    startEditing(ws) {
      this.selectedWorkspace = ws
      this.editTitle = ws.name
      this.editingPopup = true
    },
    editWorkspace() {
      const editedWorkspace = {
        ...this.selectedWorkspace,
        name: this.editTitle,
        path: `/workspace/${this.costumEncodeURI(this.editTitle)}`,
      }
      this.$store.dispatch('editWorkspace', editedWorkspace)
      this.editingPopup = false
    },
    cancelEditing() {
      this.editingPopup = false
    },
    sendWorksapce(ws) {
      localStorage.setItem('activeKey', ws.key)
      this.$store.state.activeWsKey = ws.key
      this.$router.push(`${ws.path}`)
    },
    costumEncodeURI(title) {
      for (const key in this.trMap) {
        title = title.replace(new RegExp('[' + key + ']', 'g'), this.trMap[key])
      }
      return title.replace(/ +/g, '-').toLowerCase()
    }
  },
  computed: {
    ...mapGetters(['getWorkspaces'])
  },
  beforeCreate() {
    this.$store.dispatch('getWorkspaces')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="true">
.handle {
  /* padding: 100px; */
  padding: 70px 100px;
  display: flex;
  height: calc(100vh - 70px);
}
.box {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: var(--c-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0px 50px 50px 50px;
  color: var(--c-light);
  padding: 0 15px;
}
.wsName {
  word-break: break-all !important;
}
.add {
  min-width: 200px;
}
.add span {
  margin-top: 35px;
}
.add * {
  opacity: 0.6;
}
.workspace:hover {
  border-bottom: 2px solid var(--c-highlight);
}
.iconAdd {
  color: var(--c-highlight);
  width: 30px;
  height: 30px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.container::-webkit-scrollbar {
  display: none !important;
}
.transactions {
  position: absolute;
  top: 4px;
  right: 6px;
}
.iconMore {
  width: 25px;
  height: 25px;
  color: var(--c-bg);
}

.icons {
  position: absolute;
  z-index: 4;
  top: 0;
  right: 0;
  opacity: 0;
  transition: 200ms all;
  width: 50px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility:hidden;
}
.icon {
  background: var(--c-dark);
  width: 26px;
  height: 26px;
  padding: 4px;
  border-radius: 4px;
  color: var(--c-bg);
  margin-bottom: 4px;
}
.delete:hover {
  background-color: var(--c-danger);
  color: var(--c-light);
}
.edit:hover {
  background-color: var(--c-primary);
  color: var(--c-light);
}

.transactions:hover .icons {
  transform: translateX(50px);
  opacity: 1;
  visibility: visible;
}
.transactions:hover .iconMore {
  color: var(--c-highlight);
}
.addingİnput {
  padding: 15px;
  font-size: 1rem;
  outline-color: var(--c-highlight);
  border-radius: 6px;
}
.editInput {
  padding: 8px;
  outline-color: var(--c-highlight);
}
.btn {
  color: var(--c-light);
  padding: 15px;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 15px;
}
.popupContent .add {
  background: var(--c-add);
}
.popupContent section {
  margin-top: 15px;
}
section label {
  margin: 0px 5px;
  color: var(--c-light);
}
.iconClose {
  position: absolute;
  right: 2px;
  top: 4px;
  cursor: pointer;
}
.deleteWarning {
  color: var(--c-light);
  margin-bottom: 15px;
}
.deleteBtn {
  background: var(--c-danger);
  width: 8vw;
  align-self: center;
}
.saveEditBtn {
  background: var(--c-primary);
  width: 8vw;
  align-self: center;
  margin-top: 5vh;
}
</style>
