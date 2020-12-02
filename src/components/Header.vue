<template>
  <header class="header">
    <IconArrowLeftRound
      stroke="#fff"
      class="back"
      @click="goBack"
      v-if="isRouteWorkspace"
    />
    <span class="activeWs">{{ activeWorkspaceName }}</span>
    <button>LOGOUT</button>
  </header>
</template>

<script>
import IconArrowLeftRound from './icons/arrowLeftRound.svg'

export default {
  name: 'Header',
  components: {
    IconArrowLeftRound
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    isRouteWorkspace() {
      return this.$route.name != 'HandleWorkspaces'
    },
    activeWorkspaceName(){
      return this.$route.params.name
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background-color: var(--c-dark);
  color: var(--c-text);
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
}
.back {
  cursor: pointer;
}
.header span {
  font-size: var(--fs-title);
}
.header button {
  color: inherit;
  font-size: var(--fs-title);
}
</style>
