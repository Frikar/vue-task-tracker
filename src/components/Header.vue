<template>
  <header>
    <h1>{{ title }}</h1>
    <Button v-show="homePage" @btn-click="$emit('toggle-add')" :text="showAddTask ? 'Close' : 'Add Task'"
            :color="showAddTask ? 'red' : 'green'"></Button>
    <!--    <Button text="Update Task" color="blue"></Button>-->
    <!--    <Button text="Delete Task" color="red"></Button>-->
  </header>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  computed: {
    homePage() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Button
  },
  emits: ['toggle-add']

}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
