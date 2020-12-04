<template>
  <div id="app">
    <Header v-if="isHeaderActive" />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    Header,
  },
  computed:{

    isHeaderActive(){
      return !['Login','NotFound'].includes(this.$route.name)
      
    }
  }
}
</script>

<style></style>
