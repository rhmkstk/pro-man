<template>
  <header class="header">
    <div>Selam</div>
    <IconAdd/>
    <IconMore/>
    <IconGarbage/>
    <IconEdit />
    <IconArrowLeft/>
  </header>
</template>

<script>
import IconAdd from './icons/add.svg'
import IconMore from './icons/more.svg'
import IconGarbage from './icons/garbage.svg'
import IconEdit from './icons/edit.svg'
import IconArrowLeft from './icons/arrowLeft.svg'


export default {
  name: 'Header',
  components: {
    IconAdd,
    IconMore,
    IconGarbage,
    IconEdit,
    IconArrowLeft
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
