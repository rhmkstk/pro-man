<template>
  <div id="app">
    <!-- <HandleWorkspaces /> -->
    <!-- <Header />
    <Workspace /> -->
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header'
import HandleWorkspaces from './components/HandleWorkspaces'
import Workspace from './components/Workspace'

export default {
  name: 'app',
  components: {
    Header,
    Workspace,
    HandleWorkspaces
  }
}
</script>

<style></style>
