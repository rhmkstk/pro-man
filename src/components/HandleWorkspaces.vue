<template>
  <div class="handle">
    <div class="box add">
      <IconAdd class="iconAdd" />
      <span>Add New Worksapce</span>
    </div>
    <div class="container">
      <div class="box workspace">
        <div class="transactions">
          <IconMore class="iconMore" />
          <div class="icons">
            <IconDelete class="icon delete" />
            <IconEdit class="icon edit" />
          </div>
        </div>
        <span>workspace</span>
        <span>75 %</span>
      </div>
      <div class="box workspace">
        <div class="transactions">
          <IconMore class="iconMore" />
          <div class="icons">
            <IconDelete class="icon delete" />
            <IconEdit class="icon edit" />
          </div>
        </div>
        <span>workspace</span>
        <span>75 %</span>
      </div>
      <div class="box workspace">
        <div class="transactions">
          <IconMore class="iconMore" />
          <div class="icons">
            <IconDelete class="icon delete" />
            <IconEdit class="icon edit" />
          </div>
        </div>
        <span class="text">workspace</span>
        <span>75 %</span>
      </div>
      <div class="box workspace">
        <div class="transactions">
          <IconMore class="iconMore" />
          <div class="icons">
            <IconDelete class="icon delete" />
            <IconEdit class="icon edit" />
          </div>
        </div>
        <span class="text">workspace</span>
        <span>75 %</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconAdd from './icons/add.svg'
import IconMore from './icons/more.svg'
import IconDelete from './icons/garbage.svg'
import IconEdit from './icons/edit.svg'

export default {
  name: 'Header',
  components: {
    IconAdd,
    IconMore,
    IconDelete,
    IconEdit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.handle {
  padding: 100px;
  display: flex;
}
.box {
  position: relative;
  min-width: 200px;
  height: 200px;
  background-color: var(--c-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 40px;
  margin-right: 40px;
  margin-left: 40px;
  color: #fff;
}
.box span{
  margin-bottom: 10px;
  margin-top: 10px;
}
.add span{
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
  top: 0px;
  display: none;
}
.icon {
  background: var(--c-dark);
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 4px;
  color: var(--c-bg);
  margin-bottom: 4px;
}
.delete:hover{
  background-color: var(--c-danger);
  color: #fff;
}
.edit:hover{
  background-color: var(--c-primary);
  color: #fff;
}

.transactions:hover .icons {
  transform: translateX(40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 80px;
  left: -15px;
  top: -15px;
}
.transactions:hover .iconMore{
  color: var(--c-highlight);
}
</style>
